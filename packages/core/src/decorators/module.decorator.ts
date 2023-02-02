import {
  MODULE_TYPE,
  DEPENDENCY_TYPE,
  MetadataService,
  DEPENDENCY_ID,
  DEPENDENCY_OWNER,
} from '../metadata';
import { TModuleOptions } from '../types';

export function Module(targetMetadata: TModuleOptions): ClassDecorator {
  return function (target: any) {
    MetadataService.setMetadata(target, DEPENDENCY_ID, Symbol(MODULE_TYPE));
    MetadataService.setMetadata(target, DEPENDENCY_TYPE, MODULE_TYPE);
    for (const property in targetMetadata) {
      // Skip the exports type since it doesn't register any dependency type
      if (property === 'exports') continue;

      if (property in targetMetadata) {
        const dependencies = (targetMetadata as any)[property];

        MetadataService.setMetadata(target, property, dependencies);

        // Specifiy the module that registered the dependency on the dependency itself so that it
        // can be traced back to who it belongs to.
        if (property !== 'imports' && Array.isArray(dependencies)) {
          for (const dependency of dependencies) {
            MetadataService.setMetadata(dependency, DEPENDENCY_OWNER, target);
          }
        }
      }
    }
  };
}
