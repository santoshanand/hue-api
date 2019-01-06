import { Injectable } from '@angular/core';
import { Bridge } from '../models/bridge';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() { }

  setUsername(username: string) {
    localStorage.setItem('username', username);
  }
  saveBridge(bridge: Array<Bridge>) {
    localStorage.setItem('bridge', JSON.stringify(bridge));
  }
  get bridges(): Array<Bridge> {
    const sBridge = localStorage.getItem('bridge') || '[]';
    return JSON.parse(sBridge);
  }
  get host() {
    // TODO make it generic
    return (this.bridges.length > 0 ? this.bridges[0].address : '') || '';
  }
  get username() {
    return localStorage.getItem('username') || '';
  }

  get endPoint() {
    return `${this.host}/${this.username}`;
  }
}
