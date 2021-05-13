import { AccountModel } from '@/domain/models';
import { IAddAccount } from '@/domain/usecases';

export interface IAddAccountRepository {
  add(
    data: IAddAccountRepository.Params,
  ): Promise<IAddAccountRepository.Result>;
}

export namespace IAddAccountRepository {
  export type Params = IAddAccount.Params;
  export type Result = AccountModel;
}
