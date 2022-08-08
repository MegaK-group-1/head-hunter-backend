import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileImport, GetUsersResponse, ImportUsersResponse } from '../types';
import { storagePath } from '../config/storage/storage.config';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getUsers(): Promise<GetUsersResponse> {
    return await this.usersService.getUsers();
  }

  // TODO: wstęp tylko dla zalogowanego, rework
  @Get('/me')
  getMe(@Param('id') id: string) {
    console.log({ id });
    return 'id';
  }

  // TODO: wstęp tylko dla zalogowanego, rework
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('usersCsv', { dest: storagePath }))
  async importFromCsv(
    @UploadedFile() file: FileImport,
    @Req() req: Request,
  ): Promise<ImportUsersResponse> {
    return await this.usersService.importFromCsv(
      file,
      `${req.protocol}::/${req.get('host')}/users`,
    );
  }
}
