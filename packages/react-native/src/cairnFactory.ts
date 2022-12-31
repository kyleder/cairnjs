import { CairnApplication } from './cairnApplication';
import { CairnStack } from '@cairnjs/core';
import { ReactNavigationNavigatorService } from '@cairnjs/react-native-navigation';

class CairnFactoryStatic {
  public async create(module: any): Promise<CairnApplication> {
    // const applicationConfig = new ApplicationConfig();
    console.log('building the stack');
    const stack = new CairnStack(module);

    const navigator = new ReactNavigationNavigatorService();

    const app = new CairnApplication(stack, navigator);
    return app;
  }
}

export const CairnFactory = new CairnFactoryStatic();
