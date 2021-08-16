import { Test, TestingModule } from '@nestjs/testing';
import { SendController } from './send.controller';

describe('SendController', () => {
  let controller: SendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendController],
    }).compile();

    controller = module.get<SendController>(SendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
