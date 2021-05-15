import { SurveyModel } from '@/domain/models/survey';

export interface ILoadSurveys {
  load(accountId: string): Promise<ILoadSurveys.Result>;
}
export namespace ILoadSurveys {
  export type Result = SurveyModel[];
}
