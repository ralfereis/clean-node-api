import { IValidation } from '../../../../../presentation/protocols/validation';
import { IEmailValidator } from '../../../../../validation/protocols/email-validator';
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation,
} from '../../../../../validation/validators';
import { makeLoginValidation } from './login-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: IValidation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
