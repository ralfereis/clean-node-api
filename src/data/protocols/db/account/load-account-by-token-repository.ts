import { IAccountModel } from '../../../usecases/add-account/db-add-account-protocols';

export interface ILoadAccountByTokenRepository {
  loadByToken(token: string, role?: string): Promise<IAccountModel>;
}
