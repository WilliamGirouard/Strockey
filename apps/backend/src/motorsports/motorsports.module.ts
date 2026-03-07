import { Module } from '@nestjs/common';
import { MotorSportsService } from './motorsports.service';
import { MotorSportsController } from './motorsports.controller';
import { SportsApiModule } from 'src/sports-api/sports-api.module';

@Module({
  providers: [MotorSportsService],
  controllers: [MotorSportsController],
  imports:[SportsApiModule],
})
export class MotorSportsModule {}
