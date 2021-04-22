/* eslint-disable max-classes-per-file */
import { ISurveyModel } from '../../../domain/models/survey';
import { ILoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository';
import { DbLoadSurveys } from './db-load-surveys';

const makeFakeSurveys = (): ISurveyModel[] => {
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
    loadAll(): Promise<ISurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()));
    }
  }
  return new LoadSurveysRepositoryStub();
};

interface ISutTypes {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: ILoadSurveysRepository;
}
const makeSut = (): ISutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return {
    sut,
    loadSurveysRepositoryStub,
  };
};
describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });
});
