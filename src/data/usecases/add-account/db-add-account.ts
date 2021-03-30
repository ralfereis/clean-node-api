import { IAccountModel } from '../../../domain/models/account';
import {
  IAddAccount,
  IAddAccountModel,
} from '../../../domain/usecases/add-account';
import { IEncrypter } from '../../protocols/encrypter';

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;
  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }
  async add(account: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise(resolve => resolve(null));
  }
}
