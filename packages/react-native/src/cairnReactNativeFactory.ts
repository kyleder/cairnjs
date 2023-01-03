import { CairnReactNativeApplication } from './cairnReactNativeApplication';
import { CairnStack } from '@cairnjs/core';
import { ReactNavigationNavigatorService } from '@cairnjs/react-native-navigation';

class CairnReactNativeFactoryStatic {
  public async create(module: any): Promise<CairnReactNativeApplication> {
    // const applicationConfig = new ApplicationConfig();
    const stack = new CairnStack(module);

    const navigator = new ReactNavigationNavigatorService();

    const app = new CairnReactNativeApplication(stack, navigator);
    return app;
  }
}

export const CairnReactNativeFactory = new CairnReactNativeFactoryStatic();
