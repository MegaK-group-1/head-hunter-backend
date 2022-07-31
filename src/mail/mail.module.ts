import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { mailConfig } from '../config/mailer/mailer.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => mailConfig,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
