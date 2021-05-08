import { InvalidParamError } from '@/presentation/errors';
import {
  forbidden,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper';
import {
  HttpRequest,
  HttpResponse,
  IController,
  ILoadSurveyById,
  ILoadSurveyResult,
} from './load-survey-result-controller-protocols';

export class LoadSurveyResultController implements IController {
  constructor(
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly loadSurveyResult: ILoadSurveyResult,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId);
      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}
