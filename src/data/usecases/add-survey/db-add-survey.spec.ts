/* eslint-disable max-classes-per-file */
import { DbAddSurvey } from './db-add-survey';
import {
  IAddSurveyModel,
  IAddSurveyRepository,
} from './db-add-survey-protocols';

const makeFakeSurveyData = (): IAddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
});

const makeAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    add(surveyData: IAddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyRepositoryStub();
};

interface ISutTypes {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: IAddSurveyRepository;
}

const makeSut = (): ISutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.add(makeFakeSurveyData());
    await expect(promise).rejects.toThrow();
  });
});
