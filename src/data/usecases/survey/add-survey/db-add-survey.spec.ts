import { DbAddSurvey } from './db-add-survey';
import { AddSurveyRepositorySpy } from '@/data/test';
import { mockAddSurveyParams, throwError } from '@/domain/test';
import Mockdate from 'mockdate';

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositorySpy: AddSurveyRepositorySpy;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy();
  const sut = new DbAddSurvey(addSurveyRepositorySpy);
  return {
    sut,
    addSurveyRepositorySpy,
  };
};

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut();
    const surveyData = mockAddSurveyParams();
    await sut.add(surveyData);
    expect(addSurveyRepositorySpy.addSurveyParams).toEqual(surveyData);
  });

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut();
    jest
      .spyOn(addSurveyRepositorySpy, 'add')
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockAddSurveyParams());
    await expect(promise).rejects.toThrow();
  });
});
