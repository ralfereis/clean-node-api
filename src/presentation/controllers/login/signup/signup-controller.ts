import { EmailInUserError } from '../../../errors';
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper';
import { IValidation } from '../../../protocols/validation';
import {
  IAddAccount,
  IController,
  IHttpRequest,
  IHttpResponse,
  IAuthentication,
} from './signup-controller-protocols';

export class SignUpController implements IController {
  constructor(
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication,
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      if (!account) {
        return forbidden(new EmailInUserError());
      }
      const accessToken = await this.authentication.auth({
        email,
        password,
      });
      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
