// Javascript doesn't natively support function decorators
import type { ComponentType } from 'react';
import { MetadataService } from '@cairnjs/core';
import { CONTEXT_WATERMARK } from '../metadata';

export function Context(context: any): ComponentType<any> {
  MetadataService.setMetadata(context, CONTEXT_WATERMARK, true);
  return context;
}
