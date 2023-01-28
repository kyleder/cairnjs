import {
  DEPENDENCY_ID,
  DEPENDENCY_SCOPE,
  DEPENDENCY_TYPE,
  MetadataService,
  SERVICE_TYPE,
} from '../metadata/';
import { Scope, ScopeOptions } from '../types';

export type ServiceOptions = ScopeOptions;

const ServiceOptionsDefaults: ServiceOptions = {
  scope: Scope.Singleton,
};

export function Service(): ClassDecorator;
export function Service(options: ServiceOptions): ClassDecorator;

export function Service(options: ServiceOptions = ServiceOptionsDefaults): ClassDecorator {
  return (target: any) => {
    MetadataService.setMetadata(target, DEPENDENCY_ID, Symbol(SERVICE_TYPE));
    MetadataService.setMetadata(target, DEPENDENCY_TYPE, SERVICE_TYPE);

    if (options?.scope) {
      MetadataService.setMetadata(target, DEPENDENCY_SCOPE, options.scope);
    }
  };
}
