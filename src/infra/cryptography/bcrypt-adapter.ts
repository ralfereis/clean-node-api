import { IHasher, IHashComparer } from '@/data/protocols';

import bcrypt from 'bcrypt';

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor(private readonly salt: number) {}
  async hash(plainText: string): Promise<string> {
    const digest = await bcrypt.hash(plainText, this.salt);
    return digest;
  }
  async compare(plainText: string, digest: string): Promise<boolean> {
    const isValid = await bcrypt.compare(plainText, digest);
    return isValid;
  }
}
