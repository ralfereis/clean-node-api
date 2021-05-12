/* eslint-disable max-classes-per-file */
import { IAddAccountRepository } from '@/data/protocols/db/account/add-account-repository';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository';
import { ILoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository';
import { AccountModel } from '@/domain/models/account';
import { mockAccountModel } from '@/domain/test';
import { AddAccountParams } from '@/domain/usecases/account/add-account';
import { IUpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository';

export class AddAccountRepositorySpy implements IAddAccountRepository {
  accountModel = mockAccountModel();
  addAccountParams: AddAccountParams;

  async add(data: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = data;
    return Promise.resolve(this.accountModel);
  }
}

export class LoadAccountByEmailRepositorySpy
  implements ILoadAccountByEmailRepository
{
  accountModel = mockAccountModel();
  email: string;

  async loadByEmail(email: string): Promise<AccountModel> {
    this.email = email;
    return Promise.resolve(this.accountModel);
  }
}

export class LoadAccountByTokenRepositorySpy
  implements ILoadAccountByTokenRepository
{
  accountModel = mockAccountModel();
  token: string;
  role: string;

  async loadByToken(token: string, role?: string): Promise<AccountModel> {
    this.token = token;
    this.role = role;
    return Promise.resolve(this.accountModel);
  }
}

export class UpdateAccessTokenRepositorySpy
  implements IUpdateAccessTokenRepository
{
  id: string;
  token: string;

  async updateAccessToken(id: string, token: string): Promise<void> {
    this.id = id;
    this.token = token;
    return Promise.resolve();
  }
}
