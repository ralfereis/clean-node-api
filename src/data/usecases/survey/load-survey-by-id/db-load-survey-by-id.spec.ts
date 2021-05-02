import { ILoadSurveyByIdRepository } from './db-load-survey-by-id-protocols';
import { DbLoadSurveyById } from './db-load-survey-by-id';
import Mockdate from 'mockdate';
import { mockSurveyModel, throwError } from '@/domain/test';
import { mockLoadSurveyByIdRepository } from '@/data/test';

type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository;
};
const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });
  test('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.loadById('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return Survey on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.loadById('any_id');
    expect(surveys).toEqual(mockSurveyModel());
  });

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockImplementationOnce(throwError);
    const promise = sut.loadById('any_id');
    await expect(promise).rejects.toThrow();
  });
});
