import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token';
import { ILoadAccountByToken } from '@/domain/usecases/load-account-by-token';
import { JwAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter';
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository';
import env from '@/main/config/env';

export const makeDbLoadAddAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
