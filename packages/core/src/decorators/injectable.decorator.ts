import { INJECTABLE_SCOPE, MetadataService, Scope } from '../metadata';

export interface InjectableOptions {
  scope?: Scope;
}

export function Injectable(): ClassDecorator;

export function Injectable(options: InjectableOptions): ClassDecorator;

export function Injectable(options?: InjectableOptions): ClassDecorator {
  return (target: object) => {
    // TODO: Check the rule sets to confirm that this injection is acceptable
    if (options) {
      MetadataService.setMetadata(target, INJECTABLE_SCOPE, options.scope);
    }
  };
}
