import { MongoHelper } from '../helpers/mongo-helper';
import { AccountModel } from '@/domain/models/account';
import { AddAccountModel } from '@/domain/usecases/account/add-account';
import { IAddAccountRepository } from '@/data/protocols/db/account/add-account-repository';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository';
import { ILoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository';
import { IUpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository';

export class AccountMongoRepository
  implements
    IAddAccountRepository,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository,
    ILoadAccountByTokenRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    return MongoHelper.map(result.ops[0]);
  }
  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });
    return account && MongoHelper.map(account);
  }
  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne(
      { _id: id },
      { $set: { accessToken: token } },
    );
  }
  async loadByToken(token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [
        {
          role,
        },
        {
          role: 'admin',
        },
      ],
    });
    return account && MongoHelper.map(account);
  }
}
