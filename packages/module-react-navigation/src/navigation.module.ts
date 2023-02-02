import { Module } from '@cairnjs/core';
import { ReactNavigationNavigatorService } from './reactnavigationnavigator.service';
import { IReactNativeModule } from '@cairnjs/react-native';
// import { IReactNativeModule } from '@cairnjs/react-native';

@Module({
  services: [ReactNavigationNavigatorService],
})
export class NavigationModule implements IReactNativeModule {}
