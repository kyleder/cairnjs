import {IModule, Inject, Module} from '@cairnjs/core';
import {EnvironmentVariablesService} from './services/environmentVariables.service';

@Module({
  services: [EnvironmentVariablesService],
})
export class EnvironmentModule implements IModule {
  constructor(
    @Inject(EnvironmentVariablesService)
    private readonly envVarSvc: EnvironmentVariablesService,
  ) {}
  configure() {
    this.envVarSvc.initialize();
  }
}
