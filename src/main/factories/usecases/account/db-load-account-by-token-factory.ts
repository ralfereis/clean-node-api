import { DbLoadAccountByToken } from '@/data/usecases';
import { ILoadAccountByToken } from '@/domain/usecases';
import { JwAdapter } from '@/infra/cryptography';
import { AccountMongoRepository } from '@/infra/db';
import env from '@/main/config/env';

export const makeDbLoadAddAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
