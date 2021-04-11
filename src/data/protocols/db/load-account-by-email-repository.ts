import { IAccountModel } from '../../usecases/add-account/db-add-account-protocols';

export interface ILoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<IAccountModel>;
}
