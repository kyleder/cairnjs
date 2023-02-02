import {
  DEPENDENCY_ID,
  DEPENDENCY_SCOPE,
  DEPENDENCY_TYPE,
  INJECTABLE_TYPE,
  MetadataService,
} from '../metadata';
import { Scope, ScopeOptions } from '../types';

export type InjectableOptions = ScopeOptions & {
  type?: string;
};

const InjectableOptionsDefaults: InjectableOptions = {
  type: INJECTABLE_TYPE,
  scope: Scope.Singleton,
};

export function Injectable(): ClassDecorator;
export function Injectable(options: InjectableOptions): ClassDecorator;

export function Injectable(options: InjectableOptions = InjectableOptionsDefaults): ClassDecorator {
  return (target) => {
    MetadataService.setMetadata(target, DEPENDENCY_ID, Symbol(target.name));
    MetadataService.setMetadata(target, DEPENDENCY_TYPE, options.type);

    if (options) {
      MetadataService.setMetadata(target, DEPENDENCY_SCOPE, options.scope);
    }
  };
}
