import { IDecrypter } from '../../protocols/criptography/decrypter';
import { DbLoadAccountByToken } from './db-load-account-by-token';

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with corrects values ', async () => {
    class DecrypterStub implements IDecrypter {
      async decrypt(value: string): Promise<string> {
        return new Promise(resolve => resolve('any_value'));
      }
    }
    const decrypterStub = new DecrypterStub();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    const sut = new DbLoadAccountByToken(decrypterStub);
    await sut.load('any_token');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });
});
