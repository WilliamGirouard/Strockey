import { Module } from '@nestjs/common';
import { HockeyService } from './hockey.service';
import { HockeyController } from './hockey.controller';
import { SportsApiModule } from 'src/sports-api/sports-api.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [HockeyService],
  controllers: [HockeyController],
  imports:[SportsApiModule, CacheModule],
})
export class HockeyModule {}
