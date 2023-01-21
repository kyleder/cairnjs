import { CairnStack } from '../cairnStack';
import { IModule } from './module.type';
import { IStone } from './stone.type';

export * from './gateway.type';
export * from './logger.type';
export * from './module.type';
export * from './service.type';
export * from './stone.type';

export type TDependency = IModule | IStone | CairnStack;

export interface Context {
  readonly id: number;
}
