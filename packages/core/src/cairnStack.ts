import { Container, injectable } from 'inversify';
import {
  DEPENDENCY_ID,
  DEPENDENCY_SCOPE,
  DEPENDENCY_TYPE,
  MetadataService,
  MODULE_OPTIONS,
  MODULE_TYPE,
} from './metadata';
import { Scanner } from './scanner';
import { IModule, Scope, TDependency, TModuleOptionDefinitions } from './types';
import { Injectable } from './decorators';
import { InjectionAssertion, getInjectionAssertionMiddleware } from './middleware';

export const STACK_TYPE = 'cairnjs.core.stack';

type StackRegistry = {
  [itemId: symbol]: TDependency;
};

type StackRegistryByType = {
  [type: string]: Symbol[];
};

/**
 * The CairnStack is a central registry of the application's dependencies. It is used to find,
 * instanciate, and provide access to all of the dependencies that have been registered throughout
 * the app.
 */
@Injectable({ type: STACK_TYPE })
export class CairnStack {
  private scanner: Scanner = new Scanner();
  private container: Container = new Container();
  private rootModule?: IModule;
  private dependencyByType: StackRegistryByType = {};
  private dependencyDefinitionsById: StackRegistry = {};
  private injectionAssertions: InjectionAssertion[] = [];

  private moduleOptions = MODULE_OPTIONS;

  public initialize(rootModule: IModule): void {
    // This is a special case where, in order to make the stack available for injection, it needs
    // to be registered in an abnormal way.
    // this.addDependency(this);
    this.container.applyMiddleware(getInjectionAssertionMiddleware(this));
    this.rootModule = rootModule;
    this.scan();
    this.addStackAsDependency();
    this.initializeAllModules();
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

  private initializeAllModules(): void {
    const modules = this.getAllDependenciesOfType(MODULE_TYPE) as IModule[];
    modules.forEach((module) => {
      if (module.configure) {
        module.configure();
      }
    });
  }

  private addStackAsDependency = (): void => {
    const dependencyId = MetadataService.getMetadata<symbol>(this.constructor, DEPENDENCY_ID);
    this.container.bind<typeof this>(dependencyId).toConstantValue(this);
    this.dependencyDefinitionsById[dependencyId] = this.constructor as TDependency;
  };

  private addDependency = (dependency: TDependency): void => {
    const dependencyId = MetadataService.getMetadata<symbol>(dependency, DEPENDENCY_ID);
    const dependencyType = MetadataService.getMetadata<string>(dependency, DEPENDENCY_TYPE);
    const dependencyScope = MetadataService.getMetadata<string>(dependency, DEPENDENCY_SCOPE);
    this.dependencyByType[dependencyType] = [
      ...(this.dependencyByType[dependencyType] || []),
      dependencyId,
    ];
    injectable()(dependency);
    const res = this.container.bind(dependencyId).to(dependency);

    // TODO: split this out
    switch (dependencyScope) {
      case Scope.Transient:
        res.inTransientScope();
        break;
      case Scope.Request:
        res.inRequestScope();
        break;
      case Scope.Singleton:
      default:
        res.inSingletonScope();
        break;
    }

    this.dependencyDefinitionsById[dependencyId] = dependency;
  };

  public getDependencyDefinitionById(itemId: symbol): TDependency {
    return this.dependencyDefinitionsById[itemId];
  }

  public getAllDependenciesOfType = (type: string): TDependency[] => {
    return (this.dependencyByType[type] || []).map((dependencyId) =>
      this.container.get<TDependency>(dependencyId as symbol),
    );
  };

  public registerInjectionAssertion(assertion: InjectionAssertion): void {
    this.injectionAssertions.push(assertion);
  }

  public getAllInjectionAssertions(): InjectionAssertion[] {
    return this.injectionAssertions;
  }
}
