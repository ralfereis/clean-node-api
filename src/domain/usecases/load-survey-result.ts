import { SurveyResultModel } from '@/domain/models/survey-result';

export interface ILoadSurveyResult {
  load(surveyId: string, accountId: string): Promise<SurveyResultModel>;
}
