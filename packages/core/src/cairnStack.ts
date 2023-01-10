import { intersection } from 'lodash';
import { DEPENDENCY_ID, MetadataService, MODULE_OPTIONS } from './metadata';
import { Scanner } from './scanner';
import { IModule, TDependency, TModuleOptions } from './types';

type StackRegistry = {
  [itemId: string]: TDependency;
};

type StackRegistryByType = {
  [type: string]: string;
};

/**
 * The CairnStack is a central registry of the application's dependencies. It is used to find,
 * instanciate, and provide access to all of the dependencies that have been registered throughout
 * the app.
 */
export class CairnStack {
  private scanner: Scanner;
  private stack: StackRegistry = {};
  private stackByType: StackRegistryByType = {};
  private rootModule?: IModule;

  private moduleOptions = MODULE_OPTIONS;

  constructor() {
    this.scanner = new Scanner();
  }

  public initialize(rootModule: IModule): void {
    this.rootModule = rootModule;
    this.scan();
  }

  /**
   * The intention of this method is to be used to extend the limited set of core dependency types
   * that the CairnStack handles. Types that are added to the core stack with be loaded into the
   * stack's registry and will be available throughout the application.
   * @param additionalTypes
   */
  public addModuleDependencyTypes(additionalTypes: TModuleOptions = {}): void {
    this.moduleOptions = { ...this.moduleOptions, ...additionalTypes };
  }

  public updateRootModule(newRootModule: IModule): void {
    this.rootModule = newRootModule;
  }

  /**
   * Scan the application for all of the registered dependencies. The scan will start at the root
   * module and recursively search each imported module.
   */
  public scan() {
    if (!this.rootModule) {
      throw new Error(
        `Please make sure that a root module has been provided via the initialize method before scanning.`,
      );
    }

    const isModule = this.scanner.isModule(this.rootModule);
    if (!isModule) {
      throw new Error(
        `The root object must be a Module. Please apply the Module decorator to it and register all of the project's dependencies.`,
      );
    }

    const allDependencies = this.scanner.scanForAllDependencies(
      this.rootModule,
      this.moduleOptions,
    );
    allDependencies.forEach(this.addDependency);
    console.log(this.stack);
  }

  private addDependency = (dependency: TDependency): void => {
    const dependencyId = MetadataService.getMetadata(dependency, DEPENDENCY_ID);
    this.stack[dependencyId] = dependency;
  };

  public getAllDependenciesOfType = (type: string) => {
    return [];
  };
}
