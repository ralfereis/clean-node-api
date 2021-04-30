import { mockAddSurveyRepository } from '@/data/test';
import { throwNewError } from '@/domain/test';
import Mockdate from 'mockdate';

import { DbAddSurvey } from './db-add-survey';
import {
  AddSurveyParams,
  IAddSurveyRepository,
} from './db-add-survey-protocols';

const makeFakeSurveyData = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
});

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: IAddSurveyRepository;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
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
      .mockImplementationOnce(throwNewError);
    const promise = sut.add(makeFakeSurveyData());
    await expect(promise).rejects.toThrow();
  });
});
