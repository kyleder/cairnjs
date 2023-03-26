// Javascript doesn't natively support function decorators
import type { ComponentType } from 'react';
import { DEPENDENCY_ID, DEPENDENCY_TYPE, MetadataService } from '@cairnjs/core';
import { HOOK_TYPE } from '../metadata';

export function Hook(hook: any): ComponentType<any> {
  MetadataService.setMetadata(hook, DEPENDENCY_ID, Symbol(HOOK_TYPE));
  MetadataService.setMetadata(hook, DEPENDENCY_TYPE, HOOK_TYPE);
  return hook;
}
