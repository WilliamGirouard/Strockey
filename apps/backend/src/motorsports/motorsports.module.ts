import { Module } from '@nestjs/common';
import { MotorSportsService } from './motorsports.service';
import { MotorSportsController } from './motorsports.controller';
import { SportsApiModule } from 'src/sports-api/sports-api.module';
import { CacheHelperModule } from 'src/common/cache/cacheHelper.module';

@Module({
  providers: [MotorSportsService],
  controllers: [MotorSportsController],
  imports:[SportsApiModule, CacheHelperModule],
})
export class MotorSportsModule {}
