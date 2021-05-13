/* eslint-disable max-classes-per-file */
import {
  IAddAccount,
  IAuthentication,
  ILoadAccountByToken,
} from '@/domain/usecases';

import faker from 'faker';

export class AddAccountSpy implements IAddAccount {
  result = true;
  addAccountParams: IAddAccount.Params;

  async add(account: IAddAccount.Params): Promise<IAddAccount.Result> {
    this.addAccountParams = account;
    return this.result;
  }
}

export class AuthenticationSpy implements IAuthentication {
  authenticationParams: IAuthentication.Params;
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  };

  async auth(
    authenticationParams: IAuthentication.Params,
  ): Promise<IAuthentication.Result> {
    this.authenticationParams = authenticationParams;
    return this.authenticationModel;
  }
}

export class LoadAccountByTokenSpy implements ILoadAccountByToken {
  result = { id: faker.datatype.uuid() };
  accessToken: string;
  role: string;

  async load(
    accessToken: string,
    role?: string,
  ): Promise<ILoadAccountByToken.Result> {
    this.accessToken = accessToken;
    this.role = role;
    return this.result;
  }
}
