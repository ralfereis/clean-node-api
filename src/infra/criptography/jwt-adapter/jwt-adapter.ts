import { IDecrypter } from '@/data/protocols/criptography/decrypter';
import { IEncrypter } from '@/data/protocols/criptography/encrypter';
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
