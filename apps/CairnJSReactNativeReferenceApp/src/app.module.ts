import {Module} from '@cairnjs/core';
import {EnrollmentModule} from './features/enrollment';

@Module({
  imports: [EnrollmentModule],
})
export class AppModule {}
