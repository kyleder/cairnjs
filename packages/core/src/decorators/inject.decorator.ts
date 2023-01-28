import { inject } from 'inversify';
import { DEPENDENCY_ID, MetadataService } from '../metadata';
import { TDependency } from '../types';

export function Inject(injectable: TDependency) {
  const injectableId = MetadataService.getMetadata<symbol>(injectable, DEPENDENCY_ID);
  if (!injectableId) {
    throw new Error(
      `The requested dependency (${injectable}) is not injectable. Please make sure that it is properly registered in a module.`,
    );
  }
  return inject(injectableId);
}
