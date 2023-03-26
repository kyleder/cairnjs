import { TDependency } from '.';
import { IGateway } from './gateway.type';
import type { IService } from './service.type';
import type { IStone } from './stone.type';

export type TModuleOptions = {
  [moduleOption: string]: TDependency | TDependency[];
};

export type TModuleOptionDefinitions = {
  [moduleOption: string]: string;
};

export interface IModuleBaseOptions {
  imports?: Array<IStone | IModule>;
  services?: IService[];
  gateways?: IGateway[];
  exports?: Array<IStone | IModule>;
}

export interface IModule {
  configure?: (...args: any[]) => void;
}
