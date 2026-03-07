import { Test, TestingModule } from '@nestjs/testing';
import { MotorSportsService } from './motorsports.service';

describe('MotorSportsService', () => {
  let service: MotorSportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorSportsService],
    }).compile();

    service = module.get<MotorSportsService>(MotorSportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
