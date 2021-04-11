import jwt from 'jsonwebtoken';

import { IEncrypter } from '../encrypter';

export class JwAdapter implements IEncrypter {
  private readonly secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }
  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
}
