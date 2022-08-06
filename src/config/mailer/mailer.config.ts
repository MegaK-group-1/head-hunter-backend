import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { dirname } from 'path';

export const mailConfig = {
  transport: {
    host: 'localhost',
    port: 2500,
    auth: { user: 'testowy', password: '1234' },
    secure: false,
  },
  defaults: {
    from: 'admin@test.example.com',
  },
  template: {
    dir: dirname(dirname(__dirname)) + '/mail/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
