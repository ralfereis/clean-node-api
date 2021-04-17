import { JwAdapter } from '../../../../data/protocols/criptography/jwt-adapter/jwt-adapter';
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication';
import { IAuthentication } from '../../../../domain/usecases/authentication';
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository';
import env from '../../../config/env';

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
