import { Controller, Get, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/userobj.decorator';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { LoginUserResponse } from "../types";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const tokenData = await this.authService.login(loginDto);
    res
      .cookie('jwt', tokenData.accessToken, {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      })
      .json({ success: true } as LoginUserResponse);
  }
  //
  // @Post('/remind-password')
  // async remindPassword(
  //     @Body() req: AuthRemindPwdDto,
  // ): Promise<string> {
  //   return this.authService.remindPassword(req);
  // }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }
}
