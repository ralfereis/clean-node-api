import { InvalidParamError } from '@/presentation/errors';
import {
  forbidden,
  serverError,
} from '@/presentation/helpers/http/http-helper';
import {
  HttpRequest,
  HttpResponse,
  IController,
  ILoadSurveyById,
} from './save-survey-result-controller-protocols';

export class SaveSurveyResultController implements IController {
  constructor(private readonly loadSurveyById: ILoadSurveyById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(
        httpRequest.params.surveyId,
      );
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}
