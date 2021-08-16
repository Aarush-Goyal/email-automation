import { Test, TestingModule } from '@nestjs/testing';
import { SendService } from './send.service';

describe('SendService', () => {
  let service: SendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendService],
    }).compile();

    service = module.get<SendService>(SendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
