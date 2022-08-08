import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class TokensService {
  async createToken(token?: string): Promise<{
    token: string;
    hashedToken: string;
    tokenDate: Date;
  }> {
    if (!token) {
      const randomBytesAsync = promisify(randomBytes);
      token = (await randomBytesAsync(32)).toString('hex');
    }
    const hashedToken = createHash('sha256').update(token).digest('hex');

    const tokenDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
    return { token, hashedToken, tokenDate };
  }
}
