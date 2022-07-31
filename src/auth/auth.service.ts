import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { PasswordService } from './password/password.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async register(
    registerDto: RegisterDto,
    userId: string,
  ): Promise<{ accessToken: string; expiresIn: number }> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }
    await this.usersService.register(registerDto, user);
    return await this.login(
      { email: user.email, password: registerDto.password },
      user,
    );
  }

  async login(
    loginDto: LoginDto,
    initialLogin?: User,
  ): Promise<{ accessToken: string; expiresIn: number }> {
    if (!initialLogin) {
      const user = await this.checkUser(loginDto.email, loginDto.password);

      if (!user) {
        throw new UnauthorizedException('Password or Email is invalid');
      }

      const { expiresIn, accessToken } = await this.createToken(user.id);

      return {
        accessToken,
        expiresIn,
      };
    } else {
      const { expiresIn, accessToken } = await this.createToken(
        initialLogin.id,
      );

      return {
        accessToken,
        expiresIn,
      };
    }
  }

  async checkUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && this.passwordService.comparePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  async findUserByPayload(payload: JwtPayload): Promise<User | null> {
    return await this.usersService.findOneByPayload(payload);
  }

  private async createToken(
    userId: string,
  ): Promise<{ accessToken: string; expiresIn: number }> {
    const payload: JwtPayload = { id: userId };
    const expiresIn = 60;
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_KEY,
      expiresIn,
    });
    return {
      accessToken,
      expiresIn,
    };
  }

  // async logout(user: User, res: Response) {
  //   try {
  //     user.registerToken = null;
  //     await user.save();
  //     res.clearCookie('jwt', {
  //       secure: false,
  //       domain: 'localhost',
  //       httpOnly: true,
  //     });
  //     return res.json({ ok: true });
  //   } catch (e) {
  //     return res.json({ error: e.message });
  //   }
  // }

  // async remindPassword(req: AuthRemindPwdDto) {
  //   const user = await this.userRepository.findOne({
  //     where: { email: req.email },
  //   });
  //   //@TODO add random password generator and send it via email
  //   const newRandomPassword = 'hTY56$-5h';
  //   user.password = hashPwd(newRandomPassword);
  //   await this.userRepository.save(user);
  //   return `Twoje nowe hasło to: ${newRandomPassword}`;
  // }
}
