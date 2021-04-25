import { DbLoadSurveys } from './db-load-surveys';
import { SurveyModel } from '@/domain/models/survey';
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';
import Mockdate from 'mockdate';

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
      date: new Date(),
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer',
        },
      ],
      date: new Date(),
    },
  ];
};

const makeLoadSurveysRepository = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    loadAll(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()));
    }
  }
  return new LoadSurveysRepositoryStub();
};

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: ILoadSurveysRepository;
};
const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return {
    sut,
    loadSurveysRepositoryStub,
  };
};
describe('DbLoadSurveys', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    expect(surveys).toEqual(makeFakeSurveys());
  });

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
