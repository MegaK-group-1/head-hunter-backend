import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from './decorators/userobj.decorator';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getHello(@UserObj() user: User): string {
    console.log(user);
    return this.appService.getHello();
  }
}
