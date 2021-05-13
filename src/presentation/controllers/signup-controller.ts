import {
  IController,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { EmailInUserError } from '@/presentation/errors';
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers';
import { IValidation } from '@/presentation/protocols/validation';
import { IAddAccount, IAuthentication } from '@/domain/usecases';

export class SignUpController implements IController {
  constructor(
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });
      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
