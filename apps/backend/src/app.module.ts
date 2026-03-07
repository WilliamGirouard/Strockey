import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SportsApiModule } from './sports-api/sports-api.module';
import { HockeyModule } from './hockey/hockey.module';
import { MotorSportsModule } from './motorsports/motorsports.module';

@Module({
  imports: [SportsApiModule, HockeyModule, MotorSportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
