import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import {Gateway} from '@cairnjs/core';

export type BoulderServerGatewayConfig = {
  apiHost?: string;
  apiSecure?: string;
};

@Gateway()
export class BoulderServerGateway {
  private client: ApolloClient<NormalizedCacheObject>;

  public initialize(config: BoulderServerGatewayConfig) {
    console.log('Initializing Boulder Server Gateway');

    this.client = new ApolloClient({
      uri: 'https://flyby-gateway.herokuapp.com/',
      cache: new InMemoryCache(),
    });
  }
}
