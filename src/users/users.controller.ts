import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Headers,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  CreateUserHrDto,
  CreateUserAdminDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserObj } from 'src/decorators/userobj.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileImport, ImportUsersResponse } from '../types';
import { storagePath } from '../config/storage/storage.config';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  //

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
