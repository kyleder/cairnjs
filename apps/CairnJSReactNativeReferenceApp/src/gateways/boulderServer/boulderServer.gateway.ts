import {Gateway} from '@cairnjs/core';

export type BoulderServerGatewayConfig = {
  apiHost?: string;
  apiSecure?: string;
};

@Gateway()
export class BoulderServerGateway {
  public initialize(config: BoulderServerGatewayConfig) {
    console.log('Initializing Boulder Server Gateway');
  }
}
