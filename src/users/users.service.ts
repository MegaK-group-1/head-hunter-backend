import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { hashPwd } from 'utils/hash-pwd';
import {
  CreateUserDto,
  CreateUserHrDto,
  CreateUserAdminDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { userRole } from 'src/types/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.pwdHash = hashPwd(createUserDto.password);
    user.role = userRole.STUDENT;
    //TODO: tu ma sie znalezc email service ktory wysyla emeila z active token
    return await this.userRepository.save(user);
  }

  async createUserHr(createUserDto: CreateUserHrDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.pwdHash = hashPwd(createUserDto.password);
    user.role = userRole.HR;
    //TODO: tu ma sie znalezc email service ktory wysyla emeila z active token
    return await this.userRepository.save(user);
  }
  async createUserAdmin(createUserDto: CreateUserAdminDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.pwdHash = hashPwd(createUserDto.password);
    user.role = userRole.ADMIN;
    //TODO: tu ma sie znalezc email service ktory wysyla emeila z active token
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await User.find({ where: { role: userRole.STUDENT } });
  }
  async findOne(id: string): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user  not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    return await user.remove();
  }
}
