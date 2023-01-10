import type { ComponentType } from 'react';
import type { CairnStack, IService } from '@cairnjs/core';

export interface INavigatorService extends IService {
  getNavigatorComponent(stack: CairnStack): ComponentType<any>;
}
