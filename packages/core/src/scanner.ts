import { CairnStack } from './cairnStack';
import { IModule } from './types';

export class Scanner {
  constructor(private readonly stack: CairnStack) {}

  public async scan(module: IModule): Promise<IModule[]> {
    return [];
  }
}
