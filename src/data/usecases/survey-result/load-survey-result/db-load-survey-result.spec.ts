/* eslint-disable max-classes-per-file */
import { DbLoadSurveyResult } from './db-load-survey-result';
import {
  ILoadSurveyResultRepository,
  ILoadSurveyByIdRepository,
} from './db-load-survey-result-protocols';
import {
  LoadSurveyResultRepositorySpy,
  LoadSurveyByIdRepositorySpy,
} from '@/data/test';
import { throwError } from '@/domain/test';
import Mockdate from 'mockdate';
import faker from 'faker';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy;
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy();
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositorySpy,
    loadSurveyByIdRepositorySpy,
  );
  return {
    sut,
    loadSurveyResultRepositorySpy,
    loadSurveyByIdRepositorySpy,
  };
};

let surveyId: string;

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });
  beforeEach(() => {
    surveyId = faker.random.uuid();
  });

  test('should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut();
    await sut.load(surveyId);
    expect(loadSurveyResultRepositorySpy.surveyId).toBe(surveyId);
  });

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId')
      .mockImplementationOnce(throwError);
    const promise = sut.load(surveyId);
    await expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const {
      sut,
      loadSurveyResultRepositorySpy,
      loadSurveyByIdRepositorySpy,
    } = makeSut();
    loadSurveyResultRepositorySpy.surveyResultModel = null;
    await sut.load(surveyId);
    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId);
  });

  test('Should return surveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const {
      sut,
      loadSurveyResultRepositorySpy,
      loadSurveyByIdRepositorySpy,
    } = makeSut();
    loadSurveyResultRepositorySpy.surveyResultModel = null;
    const surveyResult = await sut.load(surveyId);
    const { surveyModel } = loadSurveyByIdRepositorySpy;
    expect(surveyResult).toEqual({
      surveyId: surveyModel.id,
      question: surveyModel.question,
      date: surveyModel.date,
      answers: surveyModel.answers.map(answer => ({
        ...answer,
        count: 0,
        percent: 0,
      })),
    });
  });

  test('Should return surveyResultModel on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut();
    const surveyResult = await sut.load(surveyId);
    expect(surveyResult).toEqual(
      loadSurveyResultRepositorySpy.surveyResultModel,
    );
  });
});
