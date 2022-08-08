import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/userobj.decorator';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import {
  LoginUserResponse,
  LogoutUserResponse,
  RegisterUserResponse,
  VerifyUserResponse,
} from '../types';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/verify/:userId/:registerToken')
  async verify(
    @Param('userId') userId: string,
    @Param('registerToken') registerToken: string,
  ): Promise<VerifyUserResponse> {
    return this.authService.verify(userId, registerToken);
  }

  @Post('/register/:userId')
  @ApiBody({ type: [RegisterDto] })
  @ApiResponse({ status: 201, description: 'User has been registered' })
  async register(
    @Body() registerDto: RegisterDto,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const tokenData = await this.authService.register(registerDto, userId);
    res
      .cookie('jwt', tokenData.accessToken, {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      })
      .status(201)
      .json({ success: true } as RegisterUserResponse);
  }

  @Post('/login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const tokenData = await this.authService.login(loginDto);
    res
      .cookie('jwt', tokenData.accessToken, {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      })
      .status(200)
      .json({ success: true } as LoginUserResponse);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async logout(@UserObj() user: User, @Res() res: Response) {
    res.clearCookie('jwt', {
      secure: false,
      domain: 'localhost',
      httpOnly: true,
    });
    return res.json({ success: true } as LogoutUserResponse);
  }

  //
  // @Post('/remind-password')
  // async remindPassword(
  //     @Body() req: AuthRemindPwdDto,
  // ): Promise<string> {
  //   return this.authService.remindPassword(req);
  // }
}
