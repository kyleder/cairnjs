// Javascript doesn't natively support function decorators
import type { ComponentType } from 'react';
import { MetadataService, DEPENDENCY_TYPE } from '@cairnjs/core';
import { TScreen } from '../types';
import { SCREEN_TYPE } from '../metadata';

export function Screen(screen: TScreen): ComponentType<any> {
  MetadataService.setMetadata(screen, DEPENDENCY_TYPE, SCREEN_TYPE);
  return screen;
}
