import { CairnStack, Inject, Module, MetadataService } from '@cairnjs/core';
import { IReactNativeModule } from '@cairnjs/react-native';
import { ReactNavigationContainer } from './navigationContainer.component';
import { NavigationScreen } from './types';
import { SCREEN_NAME, SCREEN_REQUIRES_LOGIN, SCREEN_TYPE } from './decorators';

@Module({})
export class ReactNavigationModule implements IReactNativeModule {
  private screens: NavigationScreen[] = [];
  private readonly stack: CairnStack;

  constructor(@Inject(CairnStack) stack: CairnStack) {
    // Register the screen dependency type
    stack.addModuleDependencyTypes({ screens: SCREEN_TYPE });
    this.stack = stack;
  }

  configure() {
    this.initializeScreens();
  }

  withRootComponent() {
    return () => ReactNavigationContainer({ screens: this.screens, isLoggedIn: false });
  }

  private initializeScreens() {
    const screens = this.stack.getAllDependenciesOfType(SCREEN_TYPE);
    this.screens = screens.map((screen): NavigationScreen => {
      return {
        name: MetadataService.getMetadata<string>(screen, SCREEN_NAME),
        component: screen,
        isLoginRequired: MetadataService.getMetadata<boolean>(screen, SCREEN_REQUIRES_LOGIN),
      };
    });
  }
}
