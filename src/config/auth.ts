import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

export default registerAs('auth', () => ({
  accessToken: {
    privateKey: fs.readFileSync('certs/access-token.private.pem', 'utf-8'),
    publicKey: fs.readFileSync('certs/access-token.public.pem', 'utf-8'),
  },
  refreshToken: {
    privateKey: fs.readFileSync('certs/refresh-token.private.pem', 'utf-8'),
    publicKey: fs.readFileSync('certs/refresh-token.public.pem', 'utf-8'),
  },
}));
