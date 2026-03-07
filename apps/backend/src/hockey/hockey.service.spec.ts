import { Test, TestingModule } from '@nestjs/testing';
import { HockeyService } from './hockey.service';

describe('HockeyService', () => {
  let service: HockeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HockeyService],
    }).compile();

    service = module.get<HockeyService>(HockeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
