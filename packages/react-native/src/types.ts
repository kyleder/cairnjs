import { IModule, IModuleBaseOptions } from '@cairnjs/core';
import type { ComponentType } from 'react';

export type TScreen = ComponentType<any>;
export type TComponent = ComponentType<any>;

export interface IReactNativeModuleMetadata extends IModuleBaseOptions {
  screens?: TScreen[];
  contexts?: any[];
  components?: TComponent[];
}

export interface IReactNativeModule extends IModule {
  withRootComponent?: () => ComponentType<any>;
}
