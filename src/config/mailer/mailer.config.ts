import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
