import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPwd } from 'utils/hash-pwd';
import {
  CreateUserDto,
  CreateUserHrDto,
  CreateUserAdminDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ImportUsersResponse, userRole } from 'src/types/users/user';
import { FileImport, ImportError } from '../types';
import { parse, ParseResult } from 'papaparse';
import { readFile, unlink } from 'fs/promises';
import { storagePath } from '../config/storage/storage.config';
import { ImportUserDto } from './dto/import-user.dto';

import { UserDetails } from './entities/user.details.entity';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserDetails)
    private userDetailsRepository: Repository<UserDetails>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.password = hashPwd(createUserDto.password);
    user.role = userRole.STUDENT;
    //TODO: tu ma sie znalezc email service ktory wysyla emeila z active token
    return await this.userRepository.save(user);
  }

  async createUserHr(createUserDto: CreateUserHrDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.password = hashPwd(createUserDto.password);
    user.role = userRole.HR;
    //TODO: tu ma sie znalezc email service ktory wysyla emeila z active token
    return await this.userRepository.save(user);
  }

  async createUserAdmin(createUserDto: CreateUserAdminDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.password = hashPwd(createUserDto.password);
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

  async importFromCsv(file: FileImport): Promise<ImportUsersResponse> {
    try {
      if (file) {
        const csvData = await readFile(
          `${storagePath}/${file.filename}`,
          'utf-8',
        );

        const parseResult = await this.parseCsv(csvData);

        const addedEmails: string[] = [];
        const importErrors: ImportError[] = [];
        let row = 1;

        for (const {
          email,
          bonusProjectUrls,
          projectDegree,
          teamProjectDegree,
          courseCompletion,
          courseEngagment,
        } of parseResult.data) {
          const userDto = new ImportUserDto();
          userDto.email = email;
          userDto.projectDegree = projectDegree;
          userDto.bonusProjectUrls = bonusProjectUrls;
          userDto.teamProjectDegree = teamProjectDegree;
          userDto.courseCompletion = courseCompletion;
          userDto.courseEngagment = courseEngagment;
          const errors = await validate(userDto);

          if (errors.length > 0) {
            let errorMessage = '';
            for (const err of errors) {
              for (const prop in err.constraints) {
                errorMessage += ' ' + err.constraints[prop];
              }
            }
            importErrors.push({
              row,
              errorMessage,
            });
            row++;
            continue;
          }

          const isUser = await this.userRepository.findOne({
            where: { email },
          });

          if (isUser) {
            importErrors.push({
              row,
              errorMessage: `email ${email} already exists`,
            });
            row++;
            continue;
          }

          const user = new User();
          user.email = email;

          const userDetails = UserDetails.create({ email, ...userDto });

          await this.userDetailsRepository.save(userDetails);

          user.userDetails = userDetails;

          await user.save();

          addedEmails.push(email);
          row++;
        }

        if (addedEmails.length === 0) {
          throw new BadRequestException(
            'No record Added, your csv file has probably wrong structure try again',
          );
        }

        return {
          imported: addedEmails,
          errors: importErrors,
        };
      }

      throw new NotFoundException('Csv File not Found');
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
