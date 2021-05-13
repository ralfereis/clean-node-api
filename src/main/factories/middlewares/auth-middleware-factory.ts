import { makeDbLoadAddAccountByToken } from '@/main/factories';
import { AuthMiddleware } from '@/presentation/middlewares';
import { IMiddleware } from '@/presentation/protocols';

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAddAccountByToken(), role);
};
