import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { IController, IHttpRequest, IHttpResponse } from '../../protocols';
import { IEmailValidator } from '../signup/signup-protocols';

export class LoginController implements IController {
  private readonly emailValidator: IEmailValidator;
  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = httpRequest.body;
    if (!email) {
      return new Promise(resolve =>
        resolve(badRequest(new MissingParamError('email'))),
      );
    }
    if (!password) {
      return new Promise(resolve =>
        resolve(badRequest(new MissingParamError('password'))),
      );
    }
    const isValid = this.emailValidator.isValid(email);
    if (!isValid) {
      return new Promise(resolve =>
        resolve(badRequest(new InvalidParamError('password'))),
      );
    }
  }
}
