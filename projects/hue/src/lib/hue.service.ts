import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { Bridge } from './models/bridge';
import { LocalService } from './services/local.service';
import { Light } from './models/light';
@Injectable({
  providedIn: 'root'
})
export class HueService {
  private readonly discoverUrl = 'https://discovery.meethue.com/';
  constructor(
    private http: Http,
    private localService: LocalService
  ) {}

  /**
   * This method is used to discover the local Hue bridges
   * @returns it will return {Promise<Array<Bridge>>}
   */
  async discover(): Promise<Array<Bridge>> {
    const bridges = new Array<Bridge>();
    const res = await this.http.get(this.discoverUrl).toPromise();
    if (!isNullOrUndefined(res)) {
      const tempBridges = res.json() || [];
      tempBridges.forEach((item: any) => {
        const bridge: Bridge = {
          id: item.id,
          address: `http://${item.internalipaddress}`
        };
        bridges.push(bridge);
        this.saveBridge(bridges);
      });
    }
    return bridges;
  }

  private saveBridge(bridges: Array<Bridge>) {
    if (!isNullOrUndefined(bridges) && bridges.length > 0) {
      this.localService.saveBridge(bridges);
    }
  }

  async register(name: string) {
    const reqObject = {
      devicetype: name
    };
    const res = await this.http.post(this.localService.host, reqObject).toPromise();
    if (!isNullOrUndefined(res)) {
      const jsonRes = res.json() || [];
      const resObject = jsonRes[0] || {};
      if (!isNullOrUndefined(resObject.success)) {
        this.localService.setUsername(resObject.success.username);
        return {error: null, username: resObject.success.username, errorMessage: ''};
      } else if (!isNullOrUndefined(resObject.error)) {
        return {error: resObject.error, errorMessage: 'Press bridge button to connect'};
      }
    }
    return res;
  }

  async getLights() {
    const res = await this.http.get(`${this.localService.endPoint}/lights`).toPromise();
    if (!isNullOrUndefined(res.json())) {
      const arrData = Object.entries(res.json()).map(([id, value]) => (this.parseLight(id, value)));
      return arrData;
    }
    return [];
  }
  private parseLight(id: any, value: any) {
    const light: Light = {
      ...value,
      id: id
    };
    return light;
  }
  get isConnected(): boolean {
    return this.localService.username !== '' ? true : false;
  }

  async light(value: boolean, id: string) {
    if (this.isConnected) {
      const url = `${this.localService.endPoint}/lights/${id}/state`;
      const res = await this.http.put(url, {on: value}).toPromise();
      return res.json();
    }
    return this.handlerError();
  }

  async getLight(id: string) {
    if (this.isConnected) {
      const url = `${this.localService.endPoint}/lights/${id}/state`;
      const res = await this.http.get(url).toPromise();
      return res.json();
    }
    return this.handlerError();
  }
  setAPIKey(value: string) {
    if (!isNullOrUndefined(value)) {
      this.localService.setUsername(value);
    }
  }
  private handlerError() {
    return {
      error: 'Missing username',
      errorMessage: 'You are not connected'
    };
  }

}
