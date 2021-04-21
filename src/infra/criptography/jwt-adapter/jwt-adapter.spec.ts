import jwt from 'jsonwebtoken';

import { JwAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return new Promise(resolve => resolve('any_token'));
  },
}));

const makeSut = (): JwAdapter => {
  return new JwAdapter('secret');
};
describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values ', async () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any-id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any-id' }, 'secret');
    });

    test('Should return a token on sign success ', async () => {
      const sut = makeSut();
      const accessToken = await sut.encrypt('any-id');
      expect(accessToken).toBe('any_token');
    });

    test('Should throw if sign throws', async () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.encrypt('any-id');
      await expect(promise).rejects.toThrow();
    });
  });
});
