import { IEmailValidator } from '@/validation/protocols/email-validator';

export class EmailValidatorSpy implements IEmailValidator {
  isEmailValid = true;
  email: string;

  isValid(email: string): boolean {
    this.email = email;
    return this.isEmailValid;
  }
}
