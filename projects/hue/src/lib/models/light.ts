export interface Light {
  state: State;
  swupdate: Swupdate;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: Capabilities;
  config: Config;
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
  id: string;
}

export interface Config {
  archetype: string;
  function: string;
  direction: string;
}

export interface Capabilities {
  certified: boolean;
  control: Control;
  streaming: Streaming;
}

export interface Streaming {
  renderer: boolean;
  proxy: boolean;
}

export interface Control {
  mindimlevel: number;
  maxlumen: number;
  colorgamuttype: string;
  colorgamut: number[][];
  ct: Ct;
}

export interface Ct {
  min: number;
  max: number;
}

export interface Swupdate {
  state: string;
  lastinstall?: any;
}

export interface State {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: number[];
  ct: number;
  alert: string;
  colormode: string;
  mode: string;
  reachable: boolean;
}
