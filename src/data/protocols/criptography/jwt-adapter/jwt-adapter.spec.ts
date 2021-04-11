import jwt from 'jsonwebtoken';

import { JwAdapter } from './jwt-adapter';

describe('JWT Adapter', () => {
  test('Should call sign with correct values ', async () => {
    const sut = new JwAdapter('secret');
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt('any-id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any-id' }, 'secret');
  });
});
