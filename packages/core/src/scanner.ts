import { flatten, uniq } from 'lodash';
import { DEPENDENCY_TYPE, MODULE_TYPE, MODULE_OPTIONS, MetadataService } from './metadata';
import { IModule, IStone, TDependency } from './types';

export class Scanner {
  public scanForAllDependencies(rootModule: IModule): Array<IModule | IStone> {
    const allModules = this.scanForAllModules(rootModule);

    return [];
  }

  private scanForAllModules(module: TDependency): IModule[] {
    if (!this.isModule(module)) {
      return [];
    }

    const importedDependencies = MetadataService.getMetadata(module, MODULE_OPTIONS.IMPORTS) || [];

    return importedDependencies.reduce(
      (allDependencies: TDependency[], dependency: TDependency) => {
        return uniq(flatten([...allDependencies, ...this.scanForAllModules(dependency)]));
      },
      [module],
    );
  }

  public isModule(module: TDependency): boolean {
    return MetadataService.getMetadata(module, DEPENDENCY_TYPE) === MODULE_TYPE;
  }
}
