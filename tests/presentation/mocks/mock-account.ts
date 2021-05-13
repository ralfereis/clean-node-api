/* eslint-disable max-classes-per-file */
import { AccountModel } from '@/domain/models/account';
import {
  AddAccountParams,
  IAddAccount,
  AuthenticationParams,
  IAuthentication,
  ILoadAccountByToken,
} from '@/domain/usecases';

import { AuthenticationModel } from '@/domain/models';
import { mockAccountModel } from '@/../tests/domain/mocks';

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
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  };

  async auth(
    authenticationParams: AuthenticationParams,
  ): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams;
    return this.authenticationModel;
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
