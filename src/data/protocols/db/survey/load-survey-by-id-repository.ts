import { SurveyModel } from '@/domain/models';

export interface ILoadSurveyByIdRepository {
  loadById(id: string): Promise<SurveyModel>;
}
