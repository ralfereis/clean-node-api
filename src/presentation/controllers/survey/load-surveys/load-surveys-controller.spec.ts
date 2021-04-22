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

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });
  test('Should call LoadSurveys', async () => {
    class LoadSurveysStub implements ILoadSurveys {
      async load(): Promise<ISurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()));
      }
    }
    const loadSurveysStub = new LoadSurveysStub();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    const sut = new LoadSurveysController(loadSurveysStub);
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });
});
