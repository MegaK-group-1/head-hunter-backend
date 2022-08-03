import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class TokensService {
  async createToken(): Promise<{
    token: string;
    hashedToken: string;
    tokenDate: Date;
  }> {
    const randomBytesAsync = promisify(randomBytes);
    const token = (await randomBytesAsync(32)).toString('hex');

    const hashedToken = createHash('sha256').update(token).digest('hex');

    const tokenDate = new Date(Date.now() + 240 * 60 * 1000);
    return { token, hashedToken, tokenDate };
  }
}
