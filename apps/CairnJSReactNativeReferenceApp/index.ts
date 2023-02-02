/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {CairnReactNativeFactory} from '@cairnjs/react-native';
import {AppModule} from './src/app.module';

async function bootstrap(): Promise<void> {
  const app = await CairnReactNativeFactory.create(AppModule);
  AppRegistry.registerComponent(appName, () => app.getApplicationComponent());
}

bootstrap().catch((e: unknown) => {
  throw e;
});
