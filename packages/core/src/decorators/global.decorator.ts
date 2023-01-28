import { DEPENDENCY_IS_GLOBAL, MetadataService } from '../metadata';

export function Global(): ClassDecorator {
  return (target: any) => {
    MetadataService.setMetadata(target, DEPENDENCY_IS_GLOBAL, true);
  };
}
