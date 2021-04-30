/* eslint-disable max-classes-per-file */
import { IAddAccountRepository } from '@/data/protocols/db/account/add-account-repository';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository';
import { ILoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository';
import { AccountModel } from '@/domain/models/account';
import { mockAccountModel } from '@/domain/test';
import { AddAccountParams } from '@/domain/usecases/account/add-account';
import { IUpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository';

export const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add(accountData: AddAccountParams): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()));
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements ILoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()));
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

export const mockLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
    implements ILoadAccountByTokenRepository {
    async loadByToken(token: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()));
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

export const mockUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub
    implements IUpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new UpdateAccessTokenRepositoryStub();
};
