import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SportsApiModule } from './sports-api/sports-api.module';
import { HockeyModule } from './hockey/hockey.module';
import { MotorSportsModule } from './motorsports/motorsports.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheHelperModule } from './common/cache/cacheHelper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: (configService.get<number>('CACHE_TTL') || 60) * 1000,
        max: configService.get<number>('CACHE_MAX') || 100,
      }),


    }),
    CacheHelperModule,
    SportsApiModule,
    HockeyModule,
    MotorSportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
