import { SurveyModel } from '@/domain/models/survey';

export interface ILoadSurveyById {
  loadById(): Promise<SurveyModel>;
}
