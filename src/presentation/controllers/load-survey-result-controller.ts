import { InvalidParamError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import {
  HttpRequest,
  HttpResponse,
  IController,
} from '@/presentation/protocols';
import { ILoadSurveyById, ILoadSurveyResult } from '@/domain/usecases';

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
      const surveyResult = await this.loadSurveyResult.load(
        surveyId,
        httpRequest.accountId,
      );
      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}
