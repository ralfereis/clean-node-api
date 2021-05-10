import { SurveyResultModel } from '@/domain/models/survey-result';

export interface ILoadSurveyResultRepository {
  loadBySurveyId(
    surveyId: string,
    accountId: string,
  ): Promise<SurveyResultModel>;
}
