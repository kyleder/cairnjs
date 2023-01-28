import {
  DEPENDENCY_ID,
  DEPENDENCY_SCOPE,
  DEPENDENCY_TYPE,
  GATEWAY_TYPE,
  MetadataService,
} from '../metadata';
import { Scope, ScopeOptions } from '../types';

export type GatewayOptions = ScopeOptions;

const GatewayOptionsDefaults: GatewayOptions = {
  scope: Scope.Singleton,
};

export function Gateway(): ClassDecorator;
export function Gateway(options?: GatewayOptions): ClassDecorator;

export function Gateway(options: GatewayOptions = GatewayOptionsDefaults): ClassDecorator {
  return (target: any) => {
    MetadataService.setMetadata(target, DEPENDENCY_ID, Symbol(GATEWAY_TYPE));
    MetadataService.setMetadata(target, DEPENDENCY_TYPE, GATEWAY_TYPE);

    if (options?.scope) {
      MetadataService.setMetadata(target, DEPENDENCY_SCOPE, options.scope);
    }
  };
}
