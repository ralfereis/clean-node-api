import { SurveyModel } from '@/domain/models/survey';

export interface ILoadSurveys {
  load(accountId: string): Promise<SurveyModel[]>;
}
