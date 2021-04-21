import { ILoadAccountByToken } from '../../domain/usecases/load-account-by-token';
import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols';

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly loadAccountByToken: ILoadAccountByToken) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token'];
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken);
    }
    return forbidden(new AccessDeniedError());
  }
}
