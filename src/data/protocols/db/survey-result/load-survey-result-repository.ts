import { SurveyResultModel } from '@/domain/models/';

export interface ILoadSurveyResultRepository {
  loadBySurveyId(
    surveyId: string,
    accountId: string,
  ): Promise<SurveyResultModel>;
}
