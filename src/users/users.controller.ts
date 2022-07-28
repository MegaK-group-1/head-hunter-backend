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
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserHrDto,
  CreateUserAdminDto,
  CreateUserDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserObj } from 'src/decorators/userobj.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileImport, ImportUsersResponse } from "../types";
import { storagePath } from '../config/storage/storage.config';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // TODO: wstęp tylko dla admina - zabezpieczyc
  @Post('/hr')
  createUserHr(@Body() createUserDto: CreateUserHrDto) {
    return this.usersService.createUserHr(createUserDto);
  }
  // TODO: wstęp tylko dla admina - zabezpieczyc
  @Post('/admin')
  createUserAdmin(@Body() createUserDto: CreateUserAdminDto) {
    return this.usersService.createUserAdmin(createUserDto);
  }

  @Get('/')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
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

  // TODO: wstęp tylko dla admina - zabezpieczyc
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('usersCsv', { dest: storagePath }))
  async importFromCsv(
    @UploadedFile() file: FileImport,
  ): Promise<ImportUsersResponse> {
    return await this.usersService.importFromCsv(file);
  }
}
