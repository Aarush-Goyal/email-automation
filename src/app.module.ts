import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendModule } from './send/send.module';

@Module({
  imports: [
    SendModule,
    ConfigModule.forRoot({ envFilePath: ['.env.local'], isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
