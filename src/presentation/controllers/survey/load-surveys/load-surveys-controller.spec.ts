/* eslint-disable max-classes-per-file */
import {
  noContent,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper';
import { LoadSurveysController } from './load-surveys-controller';
import { SurveyModel, ILoadSurveys } from './load-surveys-controller-protocols';
import Mockdate from 'mockdate';
import { mockSurveysModels, throwNewError } from '@/domain/test';

const makeLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModels()));
    }
  }
  return new LoadSurveysStub();
};
type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: ILoadSurveys;
};
const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys();
  const sut = new LoadSurveysController(loadSurveysStub);
  return {
    sut,
    loadSurveysStub,
  };
};

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(mockSurveysModels()));
  });

  test('Should return 204 if LoadSurveys empty ', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve([])));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwNewError);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
