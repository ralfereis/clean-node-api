import { HttpRequest } from './load-survey-controller-protocols';
import { mockLoadSurveyById } from '@/presentation/test';
import { LoadSurveyResultController } from './load-survey-controller';

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});
describe('LoadSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct id', async () => {
    const loadSurveyByIdStub = mockLoadSurveyById();
    const sut = new LoadSurveyResultController(loadSurveyByIdStub);
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(mockRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });
});
