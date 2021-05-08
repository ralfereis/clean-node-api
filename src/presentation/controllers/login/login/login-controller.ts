import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/helpers/http/http-helper';
import {
  IController,
  HttpRequest,
  HttpResponse,
  IAuthentication,
  IValidation,
} from './login-controller-protocols';

export class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { email, password } = httpRequest.body;
      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });
      if (!authenticationModel) {
        return unauthorized();
      }
      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
