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

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    class LoadAccountByTokenStub implements ILoadAccountByToken {
      load(accessToken: string, role?: string): Promise<IAccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()));
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub();
    const sut = new AuthMiddleware(loadAccountByTokenStub);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements ILoadAccountByToken {
      load(accessToken: string, role?: string): Promise<IAccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()));
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    const sut = new AuthMiddleware(loadAccountByTokenStub);
    await sut.handle({
      headers: {
        'x-access-token': 'any_token',
      },
    });
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });
});
