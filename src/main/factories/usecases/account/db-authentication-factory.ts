import { IAuthentication } from '@/domain/usecases';
import { DbAuthentication } from '@/data/usecases';
import { BcryptAdapter, JwAdapter } from '@/infra/cryptography';
import { AccountMongoRepository } from '@/infra/db';
import env from '@/main/config/env';

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
};
