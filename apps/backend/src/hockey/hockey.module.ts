import { Module } from '@nestjs/common';
import { HockeyService } from './hockey.service';
import { HockeyController } from './hockey.controller';
import { SportsApiModule } from 'src/sports-api/sports-api.module';
import { CacheHelperModule } from 'src/common/cache/cacheHelper.module';

@Module({
  providers: [HockeyService],
  controllers: [HockeyController],
  imports:[SportsApiModule, CacheHelperModule],
})
export class HockeyModule {}
