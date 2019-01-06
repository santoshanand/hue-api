import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { Bridge } from './models/bridge';
import { LocalService } from './services/local.service';
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
      if (!isNullOrUndefined(resObject.success.username)) {
        this.localService.setUsername(resObject.success.username);
        return resObject.success.username;
      }
    }
    return '';
  }

  async getLights() {
    if (this.isConnected) {
      const res = await this.http.get(this.localService.endPoint);
      return res;
    }
    return this.handlerError();
  }

  get isConnected(): boolean {
    return this.localService.username !== '' ? true : false;
  }

  async light(value: boolean, id: string) {
    if (this.isConnected) {
      const url = `${this.localService.endPoint}lights/${id}/state`;
      const res = this.http.put(url, {on: value});
      return res;
    }
    return this.handlerError();
  }

  async getLight(id: string) {
    if (this.isConnected) {
      const url = `${this.localService.endPoint}lights/${id}/state`;
      const res = this.http.get(url);
      return res;
    }
    return this.handlerError();
  }

  private handlerError() {
    return {
      error: 'Missing username',
      errorMessage: 'You are not connected'
    };
  }

}
