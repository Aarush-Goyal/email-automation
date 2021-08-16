import { Module } from '@nestjs/common';
import { SendService } from './send.service';
import { SendController } from './send.controller';

@Module({
  providers: [SendService],
  controllers: [SendController]
})
export class SendModule {}
