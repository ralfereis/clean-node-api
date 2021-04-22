import { ok } from '../../../helpers/http/http-helper';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveys,
} from './load-surveys-controller-protocols';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: ILoadSurveys) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const surveys = await this.loadSurveys.load();
    return ok(surveys);
  }
}
