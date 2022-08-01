import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  // hashToken = (p: string): string => {
  //   const hmac = crypto.createHmac('sha512', process.env.SALT);
  //   hmac.update(p);
  //   return hmac.digest('hex');
  // };

  hashPassword(p: string): string {
    const hmac = crypto.createHmac('sha512', process.env.SALT);
    hmac.update(p);
    return hmac.digest('hex');
  }

  comparePassword(password: string, hashedPassword: string): boolean {
    const passwordToCheck = this.hashPassword(password);
    return passwordToCheck === hashedPassword;
  }
}
