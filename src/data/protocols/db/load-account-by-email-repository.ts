import { IAccountModel } from '../../usecases/add-account/db-add-account-protocols';

export interface ILoadAccountByEmailRepository {
  load(email: string): Promise<IAccountModel>;
}
