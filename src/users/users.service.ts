import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from 'src/types/users/user';
import { FileImport } from '../types';
import { parse, ParseResult } from 'papaparse';
import { readFile, unlink } from 'fs/promises';
import { storagePath } from '../config/storage/storage.config';
import { ImportUserDto } from './dto/import-user.dto';
import { UserDetails } from './entities/user.details.entity';
import { JwtPayload } from '../auth/jwt.strategy';
import { PasswordService } from '../auth/password/password.service';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserDetails)
    private userDetailsRepository: Repository<UserDetails>,
    private passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.password = this.passwordService.hashPassword(createUserDto.password);
    user.role = UserRole.STUDENT;
    //TODO: tu ma sie znalezc email service ktory wysyla emeila z active token
    return await this.userRepository.save(user);
  }

  async register(registerDto: RegisterDto, user: User): Promise<void> {
    user.firstName = registerDto.firstName;
    user.lastName = registerDto.lastName;
    user.password = this.passwordService.hashPassword(registerDto.password);
    if (user.role === UserRole.STUDENT) {
      user.userDetails.phone = registerDto.phone ?? null;
      user.userDetails.githubUsername = registerDto.githubUserName ?? null; //TODO github check
    }

    await this.userRepository.save(user);
  }

  async findOneByPayload(payload: JwtPayload): Promise<User | null> {
    const user = await User.findOne({ where: { id: payload.id } });
    return user ?? null;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ?? null;
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ?? null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // async remove(id: string): Promise<User> {
  //   const user = await this.findOne(id);
  //   return await user.remove();
  // }

  async importFromCsv(file: FileImport) {
    try {
      if (file) {
        const csvData = await readFile(
          `${storagePath}/${file.filename}`,
          'utf-8',
        );

        const parseResult = await this.parseCsv(csvData);
        if (parseResult.errors.length !== 0) {
          throw new Error('Oh no');
        }

        for (const {
          email,
          bonusProjectUrls,
          projectDegree,
          teamProjectDegree,
          courseCompletion,
          courseEngagment,
        } of parseResult.data) {
          const user = new User();
          const userDetails = new UserDetails();
          user.email = email;
          userDetails.projectDegree = projectDegree;
          userDetails.bonusProjectUrls = bonusProjectUrls;
          userDetails.teamProjectDegree = teamProjectDegree;
          userDetails.courseCompletion = courseCompletion;
          userDetails.courseEngagment = courseEngagment;

          await this.userDetailsRepository.save(userDetails);

          user.userDetails = userDetails;

          await user.save();
        }
      }
    } catch (e) {
      await unlink(`${storagePath}/${file.filename}`);
      throw e;
    }
  }

  private async parseCsv(csvData: string): Promise<ParseResult<ImportUserDto>> {
    return new Promise((resolve) => {
      parse(csvData, {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<ImportUserDto>) => {
          return resolve(results);
        },
      });
    });
  }
}
