import type { ComponentType } from 'react';
import { CairnStack } from '@cairnjs/core';
import type { ILoggerService } from '@cairnjs/core';
import type { INavigatorService } from '@cairnjs/react-native-navigation';

export class CairnApplication {
  private appComponent: ComponentType<any> | null = null;
  private loggers: ILoggerService[] = [];

  constructor(private readonly stack: CairnStack, private navigator: INavigatorService) {}

  public getApplicationComponent(): ComponentType<any> {
    if (!this.appComponent) {
      this.appComponent = this.buildAppComponent();
    }

    return this.appComponent;
  }

  public rebuild(): void {
    this.appComponent = this.buildAppComponent();
  }

  public useNavigator(navigator: INavigatorService): void {
    this.navigator = navigator;
  }

  public useLogger(logger: ILoggerService): void {
    this.loggers.push(logger);
  }

  private buildAppComponent(): ComponentType<any> {
    return this.navigator.getNavigatorComponent(this.stack);
  }
}
