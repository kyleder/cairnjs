import { MODULE_TYPE, DEPENDENCY_TYPE, MetadataService } from '../metadata';
import { TModuleOptions } from '../types';

export function Module(targetMetadata: TModuleOptions): ClassDecorator {
  return function (target: any) {
    MetadataService.setMetadata(target, DEPENDENCY_TYPE, MODULE_TYPE);
    for (const property in targetMetadata) {
      if (property in targetMetadata) {
        MetadataService.setMetadata(target, property, (targetMetadata as any)[property]);
      }
    }
  };
}
