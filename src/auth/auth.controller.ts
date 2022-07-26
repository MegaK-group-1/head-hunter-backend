import {
  Controller,
  Get,
  Post,
  Body, Res, UseGuards,
} from '@nestjs/common';
import {Response} from 'express';
import { AuthService } from './auth.service';
import {AuthGuard} from "@nestjs/passport";
import {UserObj} from "../decorators/userobj.decorator";
import {User} from "../users/entities/user.entity";
import {AuthRemindPwdDto} from "./dto/auth-remind-pwd.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
      @Body() req: User,
      @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res);
  }

  @Post('/remind-password')
  async remindPassword(
      @Body() req: AuthRemindPwdDto,
  ): Promise<string> {
    return this.authService.remindPassword(req);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }

}
