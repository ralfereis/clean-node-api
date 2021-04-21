import jwt from 'jsonwebtoken';

import { IDecrypter } from '../../../data/protocols/criptography/decrypter';
import { IEncrypter } from '../../../data/protocols/criptography/encrypter';

export class JwAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
  async decrypt(value: string): Promise<string> {
    jwt.verify(value, this.secret);
    return null;
  }
}
