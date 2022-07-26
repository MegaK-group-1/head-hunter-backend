import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export const hashToken = (p: string): string => {
  const hmac = crypto.createHmac('sha512', process.env.SALT);
  hmac.update(p);
  return hmac.digest('hex');
};

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac('sha512', process.env.SALT);
  hmac.update(p);
  return hmac.digest('hex');
};

export const comparePwd = async (
  password: string,
  pwdHash: string,
): Promise<boolean> => bcrypt.compare(password, pwdHash);
