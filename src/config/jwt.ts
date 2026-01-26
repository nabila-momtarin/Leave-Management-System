import { StringValue } from 'ms';
import { IJwtConfig } from '../model/interface/jwtconfig.interface';

export const jwtConfig: IJwtConfig = {
    secretKey : process.env.JWT_SECRET_KEY || 'abcdefghijklmnopqrstuvwxyz',
    expiresIn: process.env.JWT_EXPIRES_IN as StringValue,
};