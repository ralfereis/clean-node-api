import { SurveyModel } from '@/domain/models/survey';

export interface ILoadSurveysRepository {
  loadAll(accountId: string): Promise<ILoadSurveysRepository.Result>;
}

export namespace ILoadSurveysRepository {
  export type Result = SurveyModel[];
}
