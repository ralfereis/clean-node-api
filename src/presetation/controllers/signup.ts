import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import {
  IController,
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
} from '../protocols';

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator;
  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }
  handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
    return {
      statusCode: 400,
      body: 'Just to fix an error in IHttpResponse returns',
    };
  }
}
