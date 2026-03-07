import { Module } from '@nestjs/common';
import { HockeyService } from './hockey.service';
import { HockeyController } from './hockey.controller';
import { SportsApiModule } from 'src/sports-api/sports-api.module';

@Module({
  providers: [HockeyService],
  controllers: [HockeyController],
  imports:[SportsApiModule],
})
export class HockeyModule {}
