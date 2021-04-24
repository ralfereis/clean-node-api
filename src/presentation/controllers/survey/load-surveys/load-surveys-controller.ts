import {
  noContent,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper';
import {
  IController,
  HttpRequest,
  HttpResponse,
  ILoadSurveys,
} from './load-surveys-controller-protocols';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: ILoadSurveys) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();
      return surveys.length ? ok(surveys) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
