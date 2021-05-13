import { AccountModel } from '@/domain/models';

export type AddAccountParams = Omit<AccountModel, 'id'>;

export interface IAddAccount {
  add(account: AddAccountParams): Promise<AccountModel>;
}
