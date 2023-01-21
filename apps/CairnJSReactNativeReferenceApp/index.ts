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
  const rootComponent = app.getApplicationComponent();
  AppRegistry.registerComponent(appName, () => App);
}

bootstrap().catch((e: unknown) => {
  throw e;
});
