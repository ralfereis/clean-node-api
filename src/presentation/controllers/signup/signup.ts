import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, ok } from '../../helpers/http-helper';
import { IValidation } from '../../helpers/validators/validation';
import {
  IController,
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
  IAddAccount,
} from './signup-protocols';

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator;
  private readonly addAccount: IAddAccount;
  private readonly validation: IValidation;

  constructor(
    emailValidator: IEmailValidator,
    addAccount: IAddAccount,
    validation: IValidation,
  ) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
    this.validation = validation;
  }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      this.validation.validate(httpRequest.body);
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
      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
