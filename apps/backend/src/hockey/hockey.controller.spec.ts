import { Test, TestingModule } from '@nestjs/testing';
import { HockeyController } from './hockey.controller';

describe('HockeyController', () => {
  let controller: HockeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HockeyController],
    }).compile();

    controller = module.get<HockeyController>(HockeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
