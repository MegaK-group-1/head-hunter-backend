import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  ImportUsersResponse,
  UserRole,
  UserStatus,
} from 'src/types/users/user';
import { FileImport, ImportError } from '../types';
import { parse, ParseResult } from 'papaparse';
import { readFile, unlink } from 'fs/promises';
import { storagePath } from '../config/storage/storage.config';
import { ImportUserDto } from './dto/import-user.dto';
import { UserDetails } from './entities/user.details.entity';
import { JwtPayload } from '../auth/jwt.strategy';
import { PasswordService } from '../auth/password/password.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { validate } from 'class-validator';
import { TokensService } from '../auth/tokens/tokens.service';
import { MailService } from '../mail/mail.service';
import { MailRegister } from '../types/mail/mail.register';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserDetails)
    private userDetailsRepository: Repository<UserDetails>,
    private passwordService: PasswordService,
    private tokenService: TokensService,
    private mailService: MailService,
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
    user.status = UserStatus.ACTIVE;
    if (user.role === UserRole.STUDENT) {
      user.userDetails.phone = registerDto.phone ?? null;
      user.userDetails.githubUsername = registerDto.githubUserName ?? null; //TODO github check
      await this.userDetailsRepository.save(user.userDetails);
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

  async remove(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async importFromCsv(
    file: FileImport,
    mailUrl: string,
  ): Promise<ImportUsersResponse> {
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
          role,
        } of parseResult.data) {
          const userDto = new ImportUserDto();
          userDto.email = email;
          userDto.role = role;
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

          const { token, hashedToken, tokenDate } =
            await this.tokenService.createToken();

          const user = new User();
          user.email = email;
          user.role = role;
          user.registerToken = hashedToken;
          user.registerTokenDate = tokenDate;

          const userDetails = UserDetails.create({ email, role, ...userDto });

          await this.userDetailsRepository.save(userDetails);

          user.userDetails = userDetails;

          await user.save();

          addedEmails.push(email);

          const registerData: MailRegister = {
            email: user.email,
            redirectUrl: `${mailUrl}/${user.id}/${token}`,
          };
          await this.mailService.sendMail<MailRegister>(
            user.email,
            'Registration Success',
            'register',
            registerData,
          );

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
