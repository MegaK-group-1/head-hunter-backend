import { PartialType } from '@nestjs/mapped-types';
import {
  CreateUserDto,
  CreateUserHrDto,
  CreateUserAdminDto,
} from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserHrDto extends PartialType(CreateUserHrDto) {}
export class UpdateUserAdminDto extends PartialType(CreateUserAdminDto) {}
