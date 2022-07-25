import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export const hashToken = (p: string): string => {
  const hmac = crypto.createHmac('sha512', process.env.SALT);
  hmac.update(p);
  return hmac.digest('hex');
};

export const hashPwd = (password: string): string =>
  bcrypt.hashSync(password, 10);

export const comparePwd = async (
  password: string,
  pwdHash: string,
): Promise<boolean> => bcrypt.compare(password, pwdHash);
