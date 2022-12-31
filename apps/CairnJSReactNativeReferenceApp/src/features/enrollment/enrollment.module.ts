import {Module} from '@cairnjs/core';
import {ContactInfoScreen} from './screens/contactInfo.screen';
import {IntroductionScreen} from './screens/introduction.screen';

@Module({
  imports: [],
  screens: [ContactInfoScreen, IntroductionScreen],
})
export class EnrollmentModule {}
