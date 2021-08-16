import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { SendGreetingMailDto } from './dtos/send-greeting-mail.dto';
import { EmailGreetSendResponse } from './responses/email-greet-send-response';
import { SendService } from './send.service';

@Controller('send')
export class SendController {
  constructor(private sendService: SendService) {}

  @ApiCreatedResponse({ type: SendGreetingMailDto })
  @ApiBadRequestResponse({
    description:
      'If the email does not exist then a bad request error will be returned',
  })
  @UsePipes(ValidationPipe)
  @Post('greeting')
  async sendGreeting(
    @Body() body: SendGreetingMailDto,
  ): Promise<EmailGreetSendResponse> {
    return await this.sendService.sendGreetingMail(body);
  }
}
