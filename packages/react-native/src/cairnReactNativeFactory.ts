import { CairnReactNativeApplication } from './cairnReactNativeApplication';
import { CairnStack } from '@cairnjs/core';
import { ReactNativeDependencyTypes } from './metadata';

class CairnReactNativeFactoryStatic {
  public async create(module: any): Promise<CairnReactNativeApplication> {
    const stack = new CairnStack();
    stack.addModuleDependencyTypes(ReactNativeDependencyTypes);

    stack.initialize(module);

    const app = new CairnReactNativeApplication(stack);
    return app;
  }
}

export const CairnReactNativeFactory = new CairnReactNativeFactoryStatic();
