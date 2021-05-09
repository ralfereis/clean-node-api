import { SurveyModel } from '@/domain/models/survey';

export interface ILoadSurveysRepository {
  loadAll(accountId: string): Promise<SurveyModel[]>;
}
