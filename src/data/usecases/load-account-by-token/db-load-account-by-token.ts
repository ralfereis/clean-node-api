import { ILoadAccountByToken } from '../../../domain/usecases/load-account-by-token';
import { IDecrypter } from '../../protocols/criptography/decrypter';
import { IAccountModel } from '../add-account/db-add-account-protocols';

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(private readonly decrypter: IDecrypter) {}
  async load(accessToken: string, role?: string): Promise<IAccountModel> {
    await this.decrypter.decrypt(accessToken);
    return new Promise(resolve => resolve(null));
  }
}
