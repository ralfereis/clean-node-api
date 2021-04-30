import { AccountModel } from '@/domain/models/account';

export type AddAccountParams = Omit<AccountModel, 'id'>;

export interface IAddAccount {
  add(account: AddAccountParams): Promise<AccountModel>;
}
