import {Service} from '@cairnjs/core';

@Service()
export class EnvironmentVariablesService {
  public initialize() {
    console.log('Initializing the environment variable service.');
  }

  public get<T>(name: string): T {
    return 'yay';
  }
}
