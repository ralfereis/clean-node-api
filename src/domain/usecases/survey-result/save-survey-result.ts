import { SurveyResultModel } from '@/domain/models/survey-result';

export type SaveSurveyResultParams = {
  surveyId: string;
  accountId: string;
  answer: string;
  date: Date;
};

export interface ISaveSurveyResult {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
