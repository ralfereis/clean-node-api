import { AccountModel } from '@/domain/models/account';
import { AddAccountModel } from '@/domain/usecases/account/add-account';

export interface IAddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>;
}
