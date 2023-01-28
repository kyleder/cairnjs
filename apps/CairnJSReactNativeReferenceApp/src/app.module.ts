import {CairnStack, Inject, Module} from '@cairnjs/core';
import {IReactNativeModule, SCREEN_TYPE} from '@cairnjs/react-native';
import {EnrollmentModule} from './features/enrollment';
import {BoulderServerModule} from './gateways/boulderServer';
import {EnvironmentModule} from './features/environment/environment.module';
import {EnvironmentVariablesService} from './features/environment/services/environmentVariables.service';

@Module({
  imports: [EnvironmentModule, BoulderServerModule, EnrollmentModule],
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
}
