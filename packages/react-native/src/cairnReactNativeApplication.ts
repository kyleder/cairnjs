import type { ComponentType } from 'react';
import { CairnStack } from '@cairnjs/core';
import type { ILoggerService } from '@cairnjs/core';
import { EmptyComponent } from './EmptyComponent';

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
    return EmptyComponent;
  }
}
