/* eslint-disable max-classes-per-file */
import { DbLoadAccountByToken } from './db-load-account-by-token';
import {
  IDecrypter,
  ILoadAccountByTokenRepository,
} from './db-load-account-by-protocols';
import { mockAccountModel, throwError } from '@/domain/test';
import { mockDecrypter, mockLoadAccountByTokenRepository } from '@/data/test';

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterStub: IDecrypter;
  loadAccountByTokenRepositoryStub: ILoadAccountByTokenRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository();
  const decrypterStub = mockDecrypter();
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  );
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with corrects values ', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token', 'any_role');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  test('Should call LoadAccountByTokenRepository with corrects values ', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      'loadByToken',
    );
    await sut.load('any_token', 'any_role');
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
  });

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.load('any_token', 'any_role');
    expect(account).toEqual(mockAccountModel());
  });

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError);
    const promise = sut.load('any_token', 'any_role');
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_token', 'any_role');
    await expect(promise).rejects.toThrow();
  });
});
