/* eslint-disable max-classes-per-file */
import { AccountModel } from '@/domain/models/account';
import {
  AddAccountParams,
  IAddAccount,
} from '@/domain/usecases/account/add-account';

import {
  AuthenticationParams,
  IAuthentication,
} from '@/domain/usecases/account/authentication';
import { mockAccountModel } from '@/domain/test';
import { ILoadAccountByToken } from '@/domain/usecases/account/load-account-by-token';

export const mockAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountStub();
};

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth(authentication: AuthenticationParams): Promise<string> {
      return Promise.resolve('any_token');
    }
  }

  return new AuthenticationStub();
};

export const mockLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    load(accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};
