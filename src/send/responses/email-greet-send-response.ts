type Message = 'Email sent' | 'Not able to be send greeting mail.';

export class EmailGreetSendResponse {
  constructor(message: Message) {
    this.message = message;
  }

  message: string;
}
