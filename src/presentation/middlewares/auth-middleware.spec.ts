/* eslint-disable max-classes-per-file */
import { IAccountModel } from '../../domain/models/account';
import { ILoadAccountByToken } from '../../domain/usecases/load-account-by-token';
import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { AuthMiddleware } from './auth-middleware';

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
});
const makeLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    load(accessToken: string, role?: string): Promise<IAccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountByTokenStub();
};

interface ISutTypes {
  sut: AuthMiddleware;
  loadAccountByTokenStub: ILoadAccountByToken;
}
const makeSut = (): ISutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub);
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
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    await sut.handle({
      headers: {
        'x-access-token': 'any_token',
      },
    });
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });
});
