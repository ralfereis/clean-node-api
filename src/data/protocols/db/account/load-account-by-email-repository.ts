import { AccountModel } from '@/domain/models';

export interface ILoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>;
}
