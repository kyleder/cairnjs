import type { ComponentType } from 'react';
import { CairnStack, MODULE_TYPE } from '@cairnjs/core';
import type { ILoggerService } from '@cairnjs/core';
import { EmptyComponent } from './EmptyComponent';
import { IReactNativeModule } from './types';

export class CairnReactNativeApplication {
  private appComponent: ComponentType<any> | null = null;
  private loggers: ILoggerService[] = [];

  constructor(private readonly stack: CairnStack) {}

  public getApplicationComponent(): ComponentType<any> {
    if (!this.appComponent) {
      this.appComponent = this.buildAppComponent();
    }

    return this.appComponent;
  }

  public rebuild(): void {
    this.appComponent = this.buildAppComponent();
  }

  public useLogger(logger: ILoggerService): void {
    this.loggers.push(logger);
  }

  private buildAppComponent(): ComponentType<any> {
    const modules = this.stack.getAllDependenciesOfType(MODULE_TYPE) as IReactNativeModule[];
    const rootModule = modules.find((module) => !!module.provideRootComponent);
    return EmptyComponent;
    // if (!rootModule) {
    //   return EmptyComponent;
    // } else {
    //   return rootModule.provideRootComponent();
    // }
  }
}
