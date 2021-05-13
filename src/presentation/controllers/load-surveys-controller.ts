import { ILoadSurveys } from '@/domain/usecases';
import { noContent, ok, serverError } from '@/presentation/helpers';
import {
  IController,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: ILoadSurveys) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId);
      return surveys.length ? ok(surveys) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
