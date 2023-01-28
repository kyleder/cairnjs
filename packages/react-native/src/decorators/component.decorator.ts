// Javascript doesn't natively support function decorators
import type { ComponentType } from 'react';
import { DEPENDENCY_ID, DEPENDENCY_TYPE, MetadataService } from '@cairnjs/core';
import { COMPONENT_TYPE } from '../metadata';

export function Component(component: any): ComponentType<any> {
  MetadataService.setMetadata(component, DEPENDENCY_ID, Symbol(COMPONENT_TYPE));
  MetadataService.setMetadata(component, DEPENDENCY_TYPE, COMPONENT_TYPE);
  return component;
}
