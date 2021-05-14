import { HttpResponse, IController } from '@/presentation/protocols';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { InvalidParamError } from '@/presentation/errors';
import { ILoadAnswersBySurvey, ISaveSurveyResult } from '@/domain/usecases';

export class SaveSurveyResultController implements IController {
  constructor(
    private readonly loadAnswersBySurvey: ILoadAnswersBySurvey,
    private readonly saveSurveyResult: ISaveSurveyResult,
  ) {}
  async handle(
    request: SaveSurveyResultController.Request,
  ): Promise<HttpResponse> {
    try {
      const { surveyId, accountId, answer } = request;
      const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId);
      if (!answers.length) {
        return forbidden(new InvalidParamError('surveyId'));
      }
      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'));
      }
      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date(),
      });
      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string;
    accountId: string;
    answer: string;
  };
}
