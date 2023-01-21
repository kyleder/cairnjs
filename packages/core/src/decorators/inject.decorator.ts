import { DEPENDENCY_ID, INJECT_PARAMETER, MetadataService } from '../metadata';

export function Inject(injectable?: any) {
  return (target: any, methodKey: string, parameterIndex?: number) => {
    // TODO: Check the rule sets to confirm that this injection is acceptable
    MetadataService.setMetadata(target, INJECT_PARAMETER, {
      dependencyId: MetadataService.getMetadata(injectable, DEPENDENCY_ID),
      parameterIndex,
    });
  };
}
