// Javascript doesn't natively support function decorators
import type { ComponentType } from 'react';
import {
  MetadataService,
  DEPENDENCY_TYPE,
  DEPENDENCY_ID,
  DEPENDENCY_SCOPE,
  Scope,
} from '@cairnjs/core';

export type TScreen = ComponentType<any>;

export const SCREEN_NAME = 'cairnjs.module-react-navigation.screen.name';
export const SCREEN_TYPE = 'cairnjs.module-react-navigation.screen.type';
export const SCREEN_REQUIRES_LOGIN = 'cairnjs.module-react-navigation.screen.requiresLogin';

export type ScreenOptions = {
  name?: string;
  isLoginRequired?: boolean;
};

const ScreenOptionDefaults: ScreenOptions = {
  isLoginRequired: false,
};

const getScreenName = (options, screen) => {
  if (options.name) {
    return options.name;
  } else if (screen.name) {
    return screen.name;
  } else {
    return MetadataService.getMetadata<string>(screen, DEPENDENCY_ID);
  }
};

export function Screen();
export function Screen(options: ScreenOptions);

export function Screen(options: ScreenOptions = ScreenOptionDefaults) {
  return (screen: TScreen) => {
    console.log('name: ', getScreenName(options, screen));
    MetadataService.setMetadata(screen, DEPENDENCY_ID, Symbol(SCREEN_TYPE));
    MetadataService.setMetadata(screen, DEPENDENCY_TYPE, SCREEN_TYPE);
    MetadataService.setMetadata(screen, DEPENDENCY_SCOPE, Scope.Constant);
    MetadataService.setMetadata(screen, SCREEN_NAME, getScreenName(options, screen));
    return screen;
  };
}
