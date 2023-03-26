import { COMPONENT_TYPE } from './component.metadata';
import { CONTEXT_TYPE } from './context.metadata';

export * from './component.metadata';
export * from './context.metadata';
export * from './hook.metadata';

export const ReactNativeDependencyTypes = {
  contexts: CONTEXT_TYPE,
  components: COMPONENT_TYPE,
};
