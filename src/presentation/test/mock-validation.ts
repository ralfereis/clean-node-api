import { IValidation } from '@/presentation/protocols';

export class ValidationSpy implements IValidation {
  error: Error = null;
  input: any;

  validate(input: any): Error {
    this.input = input;
    return this.error;
  }
}
