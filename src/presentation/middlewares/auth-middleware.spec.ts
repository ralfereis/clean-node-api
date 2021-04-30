/* eslint-disable max-classes-per-file */
import { AuthMiddleware } from './auth-middleware';
import {
  ILoadAccountByToken,
  HttpRequest,
  AccountModel,
} from './auth-middleware-controller-protocols';
import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers/http/http-helper';
import { mockAccountModel, throwNewError } from '@/domain/test';

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

const makeLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    load(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()));
    }
  }
  return new LoadAccountByTokenStub();
};

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenStub: ILoadAccountByToken;
};
const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub, role);
  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role';
    const { sut, loadAccountByTokenStub } = makeSut(role);
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token', role);
  });

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok({ accountId: 'any_id' }));
  });

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockImplementationOnce(throwNewError);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
