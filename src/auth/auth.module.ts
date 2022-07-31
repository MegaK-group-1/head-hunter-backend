import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './password/password.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
