import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail<T>(
    to: string,
    subject: string,
    template: string,
    context: T,
  ): Promise<any> {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
