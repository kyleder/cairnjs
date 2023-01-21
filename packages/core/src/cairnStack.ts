import { pick } from 'lodash';
import { DEPENDENCY_TYPE, MetadataService, MODULE_OPTIONS } from './metadata';
import { Scanner } from './scanner';
import { IModule, TDependency, TModuleOptionDefinitions } from './types';
import { Injectable } from './decorators';
import { UuidService } from './services';

type StackRegistry = {
  [itemId: string]: TDependency;
};

type StackRegistryByType = {
  [type: string]: string[];
};

/**
 * The CairnStack is a central registry of the application's dependencies. It is used to find,
 * instanciate, and provide access to all of the dependencies that have been registered throughout
 * the app.
 */
@Injectable()
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
    // This is a special case where, in order to make the stack available for injection, it needs
    // to be registered in an abnormal way.
    this.addDependency(this);
    this.rootModule = rootModule;
    this.scan();
    this.initializeAllDependencies();
  }

  /**
   * The intention of this method is to be used to extend the limited set of core dependency types
   * that the CairnStack handles. Types that are added to the core stack with be loaded into the
   * stack's registry and will be available throughout the application.
   * @param additionalTypes
   */
  public addModuleDependencyTypes(additionalTypes: TModuleOptionDefinitions = {}): void {
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
  }

  private initializeDependency(dependency: TDependency) {}

  private initializeAllDependencies(): void {}

  private addDependency = (dependency: TDependency): void => {
    const dependencyId = UuidService.generateUniqueId();
    const dependencyType = MetadataService.getMetadata(dependency, DEPENDENCY_TYPE);
    this.stack[dependencyId] = dependency;
    if (dependencyType) {
      if (dependencyType in this.stackByType) {
        this.stackByType[dependencyType].push(dependencyId);
      } else {
        this.stackByType[dependencyType] = [dependencyId];
      }
    }
  };

  public getAllDependenciesOfType = (type: string): TDependency[] => {
    return Object.values(pick(this.stack, this.stackByType[type] || []));
  };
}
