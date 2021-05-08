import {
  IAuthentication,
  AuthenticationParams,
  IUpdateAccessTokenRepository,
  ILoadAccountByEmailRepository,
  IEncrypter,
  IHashComparer,
} from './db-authentication-protocols';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository,
  ) {}
  async auth(authenticationParams: AuthenticationParams): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authenticationParams.email,
    );
    if (account) {
      const isValid = await this.hashComparer.compare(
        authenticationParams.password,
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
