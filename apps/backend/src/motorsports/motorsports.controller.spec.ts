import { Test, TestingModule } from '@nestjs/testing';
import { MotorSportsController } from './motorsports.controller';

describe('MotorSportsController', () => {
  let controller: MotorSportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorSportsController],
    }).compile();

    controller = module.get<MotorSportsController>(MotorSportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
