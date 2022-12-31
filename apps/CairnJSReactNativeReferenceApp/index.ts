/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {CairnFactory} from '@cairnjs/react-native';
import {AppModule} from './src/app.module';

async function bootstrap(): Promise<void> {
  const app = CairnFactory.create(AppModule);
  AppRegistry.registerComponent(appName, () => App);
}

bootstrap().catch((e: unknown) => {
  throw e;
});
