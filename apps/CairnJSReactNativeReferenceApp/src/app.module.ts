import {ComponentType} from 'react';
import {CairnStack, Inject, Module} from '@cairnjs/core';
import {IReactNativeModule} from '@cairnjs/react-native';
import {
  ReactNavigationModule,
  SCREEN_TYPE,
} from '@cairnjs/module-react-navigation';
import {EnrollmentModule} from './features/enrollment';
import {BoulderServerModule} from './gateways/boulderServer';
import {EnvironmentModule} from './features/environment/environment.module';
import {EnvironmentVariablesService} from './features/environment/services/environmentVariables.service';

import App from '../App';

@Module({
  imports: [
    ReactNavigationModule,
    EnvironmentModule,
    BoulderServerModule,
    EnrollmentModule,
  ],
})
export class AppModule implements IReactNativeModule {
  constructor(
    @Inject(CairnStack)
    private readonly stack: CairnStack,
    @Inject(EnvironmentVariablesService)
    private readonly envVarSvc: EnvironmentVariablesService,
  ) {}

  configure() {
    console.log(this.stack.getAllDependenciesOfType(SCREEN_TYPE));
    console.log(this.envVarSvc.get('yay'));
  }

  withRootComponent(): ComponentType<any> {
    return App;
  }
}
