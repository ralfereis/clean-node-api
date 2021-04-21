import { IValidation } from '../../../../../presentation/protocols/validation';
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation,
} from '../../../../../validation/validators';
import { makeAddSurveyValidation } from './add-survey-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation();
    const validations: IValidation[] = [];
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
