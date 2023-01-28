// Javascript doesn't natively support function decorators
import type { ComponentType } from 'react';
import { DEPENDENCY_ID, DEPENDENCY_TYPE, MetadataService } from '@cairnjs/core';
import { CONTEXT_TYPE } from '../metadata';

export function Context(context: any): ComponentType<any> {
  MetadataService.setMetadata(context, DEPENDENCY_ID, Symbol(CONTEXT_TYPE));
  MetadataService.setMetadata(context, DEPENDENCY_TYPE, CONTEXT_TYPE);
  return context;
}
