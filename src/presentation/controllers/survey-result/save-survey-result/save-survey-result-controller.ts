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
  ISaveSurveyResult,
} from './save-survey-result-controller-protocols';

export class SaveSurveyResultController implements IController {
  constructor(
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly saveSurveyResult: ISaveSurveyResult,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const { accountId } = httpRequest;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (survey) {
        const answers = survey.answers.map(a => a.answer);
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'));
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'));
      }
      await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date(),
      });

      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}
