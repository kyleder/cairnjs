import { COMPONENT_TYPE } from './component.metadata';
import { CONTEXT_TYPE } from './context.metadata';
import { SCREEN_TYPE } from './screen.metadata';

export * from './component.metadata';
export * from './context.metadata';
export * from './screen.metadata';

export const ReactNativeDependencyTypes = {
  screens: SCREEN_TYPE,
  contexts: CONTEXT_TYPE,
  components: COMPONENT_TYPE,
};
