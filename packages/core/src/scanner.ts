import { flatten, uniq } from 'lodash';
import { DEPENDENCY_TYPE, MODULE_TYPE, MetadataService } from './metadata';
import { IModule, IStone, TDependency, TModuleOptionDefinitions } from './types';

const excludedDependencyOptions = ['exports', 'imports'];

export class Scanner {
  public scanForAllDependencies(
    rootModule: IModule,
    moduleOptions: TModuleOptionDefinitions,
  ): Array<IStone> {
    const allModules = this.scanForAllModules(rootModule);

    const optionsToCheck = Object.keys(moduleOptions).filter(
      (option) => !excludedDependencyOptions.includes(option),
    );

    return allModules.reduce((allDependencies: TDependency[], module) => {
      let newDependencies = [...allDependencies];

      // Make sure that the module is also included in the list of dependencies
      if (!allDependencies.includes(module)) {
        newDependencies.push(module);
      }
      const moduleMetadataKeys = MetadataService.getMetadataKeys(module);

      // TODO: if an unrecognized option type exists then let the developer know

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

  public scanForAllModules(module: TDependency): IModule[] {
    if (!this.isModule(module)) {
      return [];
    }

    const importedDependencies = MetadataService.getMetadata(module, 'imports') || [];

    const modules = importedDependencies.reduce(
      (allDependencies: TDependency[], dependency: TDependency) => {
        return uniq(flatten([...allDependencies, ...this.scanForAllModules(dependency)]));
      },
      [],
    );
    // Append the root module to the end of the list so that it is initialized last.
    modules.push(module);
    return modules;
  }

  public isModule(module: TDependency): boolean {
    return MetadataService.getMetadata(module, DEPENDENCY_TYPE) === MODULE_TYPE;
  }
}
