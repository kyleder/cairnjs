import { IGateway } from './gateway.type';
import type { IService } from './service.type';
import type { IStone } from './stone.type';

export interface IModuleMetadata {
  imports?: Array<IStone | IModule>;
  services?: IService[];
  gateways?: IGateway[];
  exports?: Array<IStone | IModule>;
}

export interface IModule {
  configure?: () => void;
}
