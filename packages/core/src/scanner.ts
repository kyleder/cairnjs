import { flatten, uniq } from 'lodash';
import { DEPENDENCY_TYPE, MODULE_TYPE, MetadataService } from './metadata';
import { IModule, IStone, TDependency, TModuleOptionDefinitions } from './types';

const excludedDependencyOptions = ['exports', 'imports'];

export class Scanner {
  public scanForAllDependencies(
    rootModule: IModule,
    moduleOptions: TModuleOptionDefinitions,
  ): Array<IModule | IStone> {
    const allModules = this.scanForAllModules(rootModule);

    const optionsToCheck = Object.keys(moduleOptions).filter(
      (option) => !excludedDependencyOptions.includes(option),
    );

    return allModules.reduce((allDependencies: TDependency[], module) => {
      let newDependencies = [...allDependencies];
      if (!allDependencies.includes(module)) {
        newDependencies.push(module);
      }
      const moduleMetadataKeys = MetadataService.getMetadataKeys(module);

      for (let option of optionsToCheck) {
        if (moduleMetadataKeys.includes(option)) {
          // TODO: This shouldn't assume that all options are an array of dependencies
          const dependencies = MetadataService.getMetadata(module, option);
          newDependencies = newDependencies.concat(dependencies);
        }
      }

      return uniq(newDependencies);
    }, []);
  }

  private scanForAllModules(module: TDependency): IModule[] {
    if (!this.isModule(module)) {
      return [];
    }

    const importedDependencies = MetadataService.getMetadata(module, 'imports') || [];

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
