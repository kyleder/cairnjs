import { CairnStack, Inject } from '@cairnjs/core';
import { Service } from '@cairnjs/core';
import { INavigatorService } from './types';
import { ReactNavigationContainer } from './navigationContainer.component';
import { SCREEN_TYPE } from './decorators';

@Service()
export class ReactNavigationNavigatorService implements INavigatorService {
  constructor(@Inject(CairnStack) private readonly stack: CairnStack) {}

  public getNavigatorComponent(stack: CairnStack): React.ComponentType<any> {
    const screens = stack.getAllDependenciesOfType(SCREEN_TYPE);
    return () => ReactNavigationContainer({ screens: [], isLoggedIn: false });
  }
}
