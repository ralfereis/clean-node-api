import {
  IAuthentication,
  IAuthenticationModel,
  IUpdateAccessTokenRepository,
  ILoadAccountByEmailRepository,
  ITokenGenerator,
  IHashComparer,
} from './db-authentication-protocols';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private readonly hashComparer: IHashComparer;
  private readonly tokenGenerator: ITokenGenerator;
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository;
  constructor(
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashComparer,
    tokenGenerator: ITokenGenerator,
    updateAccessTokenRepository: IUpdateAccessTokenRepository,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.tokenGenerator = tokenGenerator;
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
        const accessToken = await this.tokenGenerator.generate(account.id);
        await this.updateAccessTokenRepository.update(account.id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}
