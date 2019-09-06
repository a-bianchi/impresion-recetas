import crypto from 'crypto';
import app from '../constants/app.json';

const encrypt = data => {
  const cipher = crypto.createCipher('aes-256-cbc', app.KEY);
  let crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
};

const decrypt = data => {
  const decipher = crypto.createDecipher('aes-256-cbc', app.KEY);
  let decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
};

export { decrypt, encrypt };
