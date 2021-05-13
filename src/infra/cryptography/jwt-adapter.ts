import { IEncrypter, IDecrypter } from '@/data/protocols';

import jwt from 'jsonwebtoken';

export class JwAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plainText: string): Promise<string> {
    const cipherText = await jwt.sign({ id: plainText }, this.secret);
    return cipherText;
  }
  async decrypt(cipherText: string): Promise<string> {
    const plaintext: any = await jwt.verify(cipherText, this.secret);
    return plaintext;
  }
}
