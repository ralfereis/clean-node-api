import {
  AccountModel,
  IDecrypter,
  ILoadAccountByToken,
  ILoadAccountByTokenRepository,
} from './db-load-account-by-protocols';

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository,
  ) {}
  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken);
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        accessToken,
        role,
      );
      if (account) {
        return account;
      }
    }
    return Promise.resolve(null);
  }
}
