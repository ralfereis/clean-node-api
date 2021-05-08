import { AccountModel } from '@/domain/models/account';
import { AddAccountParams } from '@/domain/usecases/account/add-account';

export interface IAddAccountRepository {
  add(data: AddAccountParams): Promise<AccountModel>;
}
