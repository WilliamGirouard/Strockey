import { Test, TestingModule } from '@nestjs/testing';
import { SportsApiService } from './sports-api.service';

describe('SportsApiService', () => {
  let service: SportsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportsApiService],
    }).compile();

    service = module.get<SportsApiService>(SportsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
