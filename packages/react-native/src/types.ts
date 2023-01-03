import { IModuleMetadata } from '@cairnjs/core';
import type { ComponentType } from 'react';

export type TScreen = ComponentType<any>;
export type TComponent = ComponentType<any>;

export interface IReactNativeModuleMetadata extends IModuleMetadata {
  screens?: TScreen[];
  contexts?: any[];
  components?: TComponent[];
}
