/* eslint-disable max-classes-per-file */
import { IDecrypter } from '@/data/protocols/criptography/decrypter';
import { IEncrypter } from '@/data/protocols/criptography/encrypter';
import { IHashComparer } from '@/data/protocols/criptography/hash-comparer';
import { IHasher } from '@/data/protocols/criptography/hasher';
import faker from 'faker';

export class HasherSpy implements IHasher {
  digest = faker.datatype.uuid();
  plainText: string;

  async hash(plainText: string): Promise<string> {
    this.plainText = plainText;
    return Promise.resolve(this.digest);
  }
}
export class HashComparerSpy implements IHashComparer {
  plainText: string;
  digest: string;
  isValid = true;

  async compare(plainText: string, digest: string): Promise<boolean> {
    this.plainText = plainText;
    this.digest = digest;
    return Promise.resolve(this.isValid);
  }
}
export class EncrypterSpy implements IEncrypter {
  cipherText = faker.datatype.uuid();
  plainText: string;

  async encrypt(plainText: string): Promise<string> {
    this.plainText = plainText;
    return Promise.resolve(this.cipherText);
  }
}

export class DecrypterSpy implements IDecrypter {
  plainText = faker.internet.password();
  cipherText: string;

  async decrypt(cipherText: string): Promise<string> {
    this.cipherText = cipherText;
    return Promise.resolve(this.plainText);
  }
}
