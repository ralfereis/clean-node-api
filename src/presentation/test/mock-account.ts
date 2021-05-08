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
import faker from 'faker';

export class AddAccountSpy implements IAddAccount {
  accountModel = mockAccountModel();
  addAccountParams: AddAccountParams;

  async add(account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account;
    return Promise.resolve(this.accountModel);
  }
}

export class AuthenticationSpy implements IAuthentication {
  authenticationParams: AuthenticationParams;
  token = faker.datatype.uuid();

  async auth(authenticationParams: AuthenticationParams): Promise<string> {
    this.authenticationParams = authenticationParams;
    return Promise.resolve(this.token);
  }
}

export class LoadAccountByTokenSpy implements ILoadAccountByToken {
  accountModel = mockAccountModel();
  accessToken: string;
  role: string;

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken;
    this.role = role;
    return Promise.resolve(this.accountModel);
  }
}
