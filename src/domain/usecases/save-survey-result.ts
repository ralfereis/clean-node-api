import { SurveyResultModel } from '@/domain/models/survey-result';

export interface ISaveSurveyResult {
  save(data: ISaveSurveyResult.Params): Promise<ISaveSurveyResult.Result>;
}

export namespace ISaveSurveyResult {
  export type Params = {
    surveyId: string;
    accountId: string;
    answer: string;
    date: Date;
  };

  export type Result = SurveyResultModel;
}
