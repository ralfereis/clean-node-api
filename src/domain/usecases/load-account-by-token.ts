import { IAccountModel } from '@/domain/models/account';

export interface ILoadAccountByToken {
  load(accessToken: string, role?: string): Promise<IAccountModel>;
}
