import type { ComponentType } from 'react';
import type { CairnStack, IService } from '@cairnjs/core';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { TScreen } from './decorators';

export interface INavigatorService extends IService {
  getNavigatorComponent(stack: CairnStack): ComponentType<any>;
}

export type NavigationScreen = {
  name: string;
  component: TScreen;
  isLoginRequired?: boolean;
  options?: NativeStackNavigationOptions | (() => NativeStackNavigationOptions);
};

export type NavigationScreenGroup = {
  screens: NavigationScreen[];
  isLoginRequired: boolean;
  options?: NativeStackNavigationOptions | (() => NativeStackNavigationOptions);
};
