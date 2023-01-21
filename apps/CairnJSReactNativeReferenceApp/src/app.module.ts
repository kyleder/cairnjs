import {Module, CairnStack, Inject} from '@cairnjs/core';
import {IReactNativeModule} from '@cairnjs/react-native';
import {EnrollmentModule} from './features/enrollment';

@Module({
  imports: [EnrollmentModule],
})
export class AppModule implements IReactNativeModule {
  constructor(@Inject(CairnStack) private stack: CairnStack) {}

  configure() {
    console.log(this.stack);
  }

  // provideRootComponent() {}
}
