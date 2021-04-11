import {
  IAuthentication,
  IAuthenticationModel,
  IUpdateAccessTokenRepository,
  ILoadAccountByEmailRepository,
  IEncrypter,
  IHashComparer,
} from './db-authentication-protocols';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private readonly hashComparer: IHashComparer;
  private readonly encrypter: IEncrypter;
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository;
  constructor(
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashComparer,
    encrypter: IEncrypter,
    updateAccessTokenRepository: IUpdateAccessTokenRepository,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.encrypter = encrypter;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }
  async auth(authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email,
    );
    if (account) {
      const isValid = await this.hashComparer.compare(
        authentication.password,
        account.password,
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken,
        );
        return accessToken;
      }
    }
    return null;
  }
}
