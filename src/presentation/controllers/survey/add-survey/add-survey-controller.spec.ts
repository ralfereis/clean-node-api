/* eslint-disable max-classes-per-file */
import { IValidation } from '../../../protocols';
import { AddSurveyController } from './add-survey-controller';
import { IHttpRequest } from './add-survey-controller-protocols';

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
  },
});

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

interface ISutTypes {
  sut: AddSurveyController;
  validationStub: IValidation;
}

const makeSut = (): ISutTypes => {
  const validationStub = makeValidation();
  const sut = new AddSurveyController(validationStub);
  return {
    sut,
    validationStub,
  };
};
describe('AddSurvey Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
