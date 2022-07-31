import { Body, Injectable. UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { PasswordService } from './password/password.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from "@nestjs/jwt";
import { LoginUserResponse } from "../types";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async login(@Body() loginDto: LoginDto): Promise<{accessToken: string, expiresIn: number}> {
    try {
      const user = await this.checkUser(loginDto.email, loginDto.password);

      if (!user) {
        throw new UnauthorizedException('Password or Email is invalid');
      }
      const {expiresIn, accessToken } = this.createToken(user.id);

      return {
        accessToken,
        expiresIn
      }
    } catch (e) {
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

  private createToken(userId: string): {accessToken: string, expiresIn: number} {
    const payload: JwtPayload = { id: userId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, process.env.JWT_KEY, { expiresIn });
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOne({
        where: { registerToken: token },
      });
    } while (!!userWithThisToken);
    user.registerToken = token;
    await user.save();

    return token;
  }

  async logout(user: User, res: Response) {
    try {
      user.registerToken = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

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
