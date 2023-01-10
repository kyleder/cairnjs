import { DEPENDENCY_ID, DEPENDENCY_TYPE, MetadataService, SERVICE_TYPE } from '../metadata/';

export function Service(): ClassDecorator;
export function Service(prefix: string | string[]): ClassDecorator;

export function Service(prefixOrOptions?: string | string[]): ClassDecorator {
  return (target: any) => {
    MetadataService.setMetadata(target, DEPENDENCY_ID, MetadataService.generateUniqueId());
    MetadataService.setMetadata(target, DEPENDENCY_TYPE, SERVICE_TYPE);
  };
}
