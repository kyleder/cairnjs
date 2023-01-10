import { Module } from '@cairnjs/core';
import { ReactNavigationNavigatorService } from './reactnavigationnavigator.service';

@Module({
  services: [ReactNavigationNavigatorService],
})
export class NavigationModule {}
