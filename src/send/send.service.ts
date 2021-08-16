import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { debug } from 'console';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import { SendGreetingMailDto } from './dtos/send-greeting-mail.dto';
import { EmailGreetSendResponse } from './responses/email-greet-send-response';

const Oauth2 = google.auth.OAuth2;
@Injectable()
export class SendService {
  constructor(private configService: ConfigService) {}

  async sendGreetingMail(
    sendGreetingMailDto: SendGreetingMailDto,
  ): Promise<EmailGreetSendResponse> {
    const Oauth2_client = new Oauth2(
      this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
    );

    Oauth2_client.setCredentials({
      refresh_token: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    });

    const accessToken = Oauth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: `${this.configService.get('GOOGLE_EMAIL_ID')}`,
        clientId: `${this.configService.get('GOOGLE_OAUTH_CLIENT_ID')}`,
        clientSecret: `${this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET')}`,
        refreshToken: `${this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN')}`,
        accessToken: `${accessToken}`,
      },
    });

    const mail_options: nodemailer.SendMailOptions = {
      from: `${this.configService.get('GOOGLE_EMAIL_ID')}`,
      to: `${sendGreetingMailDto.email}`,
      subject: `Welcome to the Solanazilla Family`,
      text: `This is a greeting email test`,
    };

    const sendMailAsync = (transport, mail_options) => {
      return new Promise((resolve, reject) => {
        transport.sendMail(mail_options, (err, info) => {
          err ? reject(err) : resolve(info);
        });
      });
    };

    await sendMailAsync(transport, mail_options);

    return new EmailGreetSendResponse('Email sent');
  }
}
