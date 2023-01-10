import { CairnStack } from '@cairnjs/core';
import { Service } from '@cairnjs/core';
import { INavigatorService } from './types';
import { ReactNavigationContainer } from './navigationContainer.component';

@Service()
export class ReactNavigationNavigatorService implements INavigatorService {
  public getNavigatorComponent(stack: CairnStack): React.ComponentType<any> {
    const screens = stack.getAllScreens();
    return () => ReactNavigationContainer({ screens: [], isLoggedIn: false });
  }
}
