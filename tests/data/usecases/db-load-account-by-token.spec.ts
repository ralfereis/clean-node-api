/* eslint-disable max-classes-per-file */
import { DbLoadAccountByToken } from '@/data/usecases';
import { throwError } from '@/../tests/domain/mocks';
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '../mocks';

import faker from 'faker';

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterSpy: DecrypterSpy;
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy;
};

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy();
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy();
  const sut = new DbLoadAccountByToken(
    decrypterSpy,
    loadAccountByTokenRepositorySpy,
  );
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy,
  };
};

let token: string;
let role: string;

describe('DbLoadAccountByToken UseCase', () => {
  beforeEach(() => {
    token = faker.datatype.uuid();
    role = faker.random.word();
  });

  test('Should call Decrypter with correct cipherText', async () => {
    const { sut, decrypterSpy } = makeSut();
    await sut.load(token, role);
    expect(decrypterSpy.cipherText).toBe(token);
  });

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut();
    decrypterSpy.plainText = null;
    const account = await sut.load(token, role);
    expect(account).toBeNull();
  });

  test('Should call LoadAccountByTokenRepository with corrects values ', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    await sut.load(token, role);
    expect(loadAccountByTokenRepositorySpy.token).toBe(token);
    expect(loadAccountByTokenRepositorySpy.role).toBe(role);
  });

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    loadAccountByTokenRepositorySpy.accountModel = null;
    const account = await sut.load(token, role);
    expect(account).toBeNull();
  });

  test('Should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    const account = await sut.load(token, role);
    expect(account).toEqual(loadAccountByTokenRepositorySpy.accountModel);
  });

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError);
    const account = await sut.load(token, role);
    expect(account).toBeNull();
  });

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositorySpy, 'loadByToken')
      .mockImplementationOnce(throwError);
    const promise = sut.load(token, role);
    await expect(promise).rejects.toThrow();
  });
});
