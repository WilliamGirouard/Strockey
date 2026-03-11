import {  Module } from '@nestjs/common';
import { CacheHelperService } from './cacheHelper.service';



@Module({
  providers: [CacheHelperService],
  exports: [CacheHelperService],
})
export class CacheHelperModule {}