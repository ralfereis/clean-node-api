import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols';

export class AuthMiddleware implements IMiddleware {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = forbidden(new AccessDeniedError());
    return new Promise(resolve => resolve(error));
  }
}
