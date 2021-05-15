import { SurveyResultModel } from '@/domain/models/';

export interface ILoadSurveyResultRepository {
  loadBySurveyId(
    surveyId: string,
    accountId: string,
  ): Promise<ILoadSurveyResultRepository.Result>;
}

export namespace ILoadSurveyResultRepository {
  export type Result = SurveyResultModel;
}
