import { makeDbLoadAddAccountByToken } from '../usecases/account/load-account-by-token/db-load-account-by-token-factory';
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware';
import { IMiddleware } from '@/presentation/protocols';

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAddAccountByToken(), role);
};
