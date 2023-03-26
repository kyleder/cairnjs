import { IModule, IModuleBaseOptions } from '@cairnjs/core';
import type { ComponentType } from 'react';

export type TComponent = ComponentType<any>;

export interface IReactNativeModuleMetadata extends IModuleBaseOptions {
  contexts?: any[];
  components?: TComponent[];
}

export interface IReactNativeModule extends IModule {
  withRootComponent?: () => ComponentType<any>;
  withApplicationWrapper?: (app: ComponentType<any>) => ComponentType<any>;
}
