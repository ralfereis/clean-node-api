import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../presentation/helpers/validators';
import { IValidation } from '../../../presentation/protocols/validation';
import { EmailValidatorAdapter } from '../../adapter/validators/email-validator-adapter';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  );
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
