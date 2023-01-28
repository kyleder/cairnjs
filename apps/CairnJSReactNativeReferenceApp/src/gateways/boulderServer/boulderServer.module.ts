import {IModule, Module} from '@cairnjs/core';
import {BoulderServerGateway} from './boulderServer.gateway';
import {Inject} from '@cairnjs/core';

@Module({
  gateways: [BoulderServerGateway],
  exports: [BoulderServerGateway],
})
export class BoulderServerModule implements IModule {
  constructor(
    @Inject(BoulderServerGateway)
    private readonly boulderServer: BoulderServerGateway,
  ) {}
  configure() {
    this.boulderServer.initialize({});
  }
}
