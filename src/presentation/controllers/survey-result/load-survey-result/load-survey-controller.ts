import {
  HttpRequest,
  HttpResponse,
  IController,
  ILoadSurveyById,
} from './load-survey-controller-protocols';

export class LoadSurveyResultController implements IController {
  constructor(private readonly loadSurveyById: ILoadSurveyById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId);
    return Promise.resolve(null);
  }
}
