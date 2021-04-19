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

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements IAddSurveyRepository {
      add(surveyData: IAddSurveyModel): Promise<void> {
        return new Promise(resolve => resolve());
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const sut = new DbAddSurvey(addSurveyRepositoryStub);
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});
