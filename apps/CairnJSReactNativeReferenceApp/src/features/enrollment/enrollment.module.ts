import {IModule, Module} from '@cairnjs/core';
import {ContactInfoScreen} from './screens/contactInfo.screen';
import {IntroductionScreen} from './screens/introduction.screen';
import {DashboardModule} from '../dashboard/dashboard.module';

@Module({
  imports: [DashboardModule],
  screens: [ContactInfoScreen, IntroductionScreen],
})
export class EnrollmentModule implements IModule {}
