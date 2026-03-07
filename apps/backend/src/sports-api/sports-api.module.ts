import { Module } from '@nestjs/common';
import { SportsApiService } from './sports-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [SportsApiService],
  exports:[SportsApiService],
})
export class SportsApiModule {}
