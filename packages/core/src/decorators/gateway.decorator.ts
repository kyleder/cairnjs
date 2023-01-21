import { DEPENDENCY_TYPE, GATEWAY_TYPE, MetadataService } from '../metadata';

export function Gateway(): ClassDecorator;
export function Gateway(prefix: string | string[]): ClassDecorator;

export function Gateway(prefixOrOptions?: string | string[]): ClassDecorator {
  return (target: any) => {
    MetadataService.setMetadata(target, DEPENDENCY_TYPE, GATEWAY_TYPE);
  };
}
