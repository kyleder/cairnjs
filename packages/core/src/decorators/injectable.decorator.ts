import { DEPENDENCY_ID, DEPENDENCY_SCOPE, MetadataService } from '../metadata';
import { Scope, ScopeOptions } from '../types';

export type InjectableOptions = ScopeOptions;

const InjectableOptionsDefaults: InjectableOptions = {
  scope: Scope.Singleton,
};

export function Injectable(): ClassDecorator;
export function Injectable(options: InjectableOptions): ClassDecorator;

export function Injectable(options: InjectableOptions = InjectableOptionsDefaults): ClassDecorator {
  return (target) => {
    MetadataService.setMetadata(target, DEPENDENCY_ID, Symbol(target.name));

    if (options) {
      MetadataService.setMetadata(target, DEPENDENCY_SCOPE, options.scope);
    }
  };
}
