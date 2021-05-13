import { AccountModel } from '@/domain/models';
import { AddAccountParams } from '@/domain/usecases';

export interface IAddAccountRepository {
  add(data: AddAccountParams): Promise<AccountModel>;
}
