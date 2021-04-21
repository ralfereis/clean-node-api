import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IHasher,
  ILoadAccountByEmailRepository,
  IAddAccountRepository,
} from './db-add-account-protocols';

export class DbAddAccount implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
  ) {}
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email,
    );
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password);
      const newAccount = await this.addAccountRepository.add({
        ...accountData,
        password: hashedPassword,
      });
      return newAccount;
    }
    return null;
  }
}
