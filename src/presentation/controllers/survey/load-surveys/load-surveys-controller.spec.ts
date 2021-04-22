/* eslint-disable max-classes-per-file */
import Mockdate from 'mockdate';

import { LoadSurveysController } from './load-surveys-controller';
import {
  ISurveyModel,
  ILoadSurveys,
} from './load-surveys-controller-protocols';

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

const makeLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load(): Promise<ISurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()));
    }
  }
  return new LoadSurveysStub();
};
interface ISutTypes {
  sut: LoadSurveysController;
  loadSurveysStub: ILoadSurveys;
}
const makeSut = (): ISutTypes => {
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
});
