// Javascript doesn't natively support function decorators
import type { ComponentType } from 'react';
import { MetadataService } from '@cairnjs/core';
import { COMPONENT_WATERMARK } from '../metadata';

export function Component(component: any): ComponentType<any> {
  MetadataService.setMetadata(component, COMPONENT_WATERMARK, true);
  return component;
}
