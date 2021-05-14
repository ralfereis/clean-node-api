import { SurveyModel } from '@/domain/models';

export interface ILoadSurveyByIdRepository {
  loadById(id: string): Promise<ILoadSurveyByIdRepository.Result>;
}

export namespace ILoadSurveyByIdRepository {
  export type Result = SurveyModel;
}
