import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserHrDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto);
    return 'POSZLO';
  }

  async createUserHr(createUserDto: CreateUserHrDto): Promise<any> {
    console.log(createUserDto);
    return 'POSZLO HR';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
