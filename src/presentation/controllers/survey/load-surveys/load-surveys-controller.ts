import {
  noContent,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveys,
} from './load-surveys-controller-protocols';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: ILoadSurveys) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();
      return surveys.length ? ok(surveys) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
