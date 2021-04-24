import { IValidation } from '@/presentation/protocols/validation';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
