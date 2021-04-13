import jwt from 'jsonwebtoken';

import { IEncrypter } from '../encrypter';

export class JwAdapter implements IEncrypter {
  constructor(private readonly secret: string) {}
  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
}
