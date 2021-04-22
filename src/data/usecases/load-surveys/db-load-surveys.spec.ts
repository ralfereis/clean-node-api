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

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
      loadAll(): Promise<ISurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()));
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });
});
