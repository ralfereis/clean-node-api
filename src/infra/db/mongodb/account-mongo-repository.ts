import { MongoHelper } from './mongo-helper';
import {
  IAddAccountRepository,
  ILoadAccountByEmailRepository,
  ILoadAccountByTokenRepository,
  IUpdateAccessTokenRepository,
} from '@/data/protocols';

export class AccountMongoRepository
  implements
    IAddAccountRepository,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository,
    ILoadAccountByTokenRepository
{
  async add(
    data: IAddAccountRepository.Params,
  ): Promise<IAddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(data);
    return result.ops[0] !== null;
  }
  async loadByEmail(
    email: string,
  ): Promise<ILoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne(
      { email },
      {
        projection: {
          _id: 1,
          name: 1,
          password: 1,
        },
      },
    );
    return account && MongoHelper.map(account);
  }
  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne(
      { _id: id },
      { $set: { accessToken: token } },
    );
  }
  async loadByToken(
    token: string,
    role?: string,
  ): Promise<ILoadAccountByTokenRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne(
      {
        accessToken: token,
        $or: [
          {
            role,
          },
          {
            role: 'admin',
          },
        ],
      },
      {
        projection: {
          _id: 1,
        },
      },
    );
    return account && MongoHelper.map(account);
  }
}
