import { ISurveyModel } from '@/domain/models/survey';

export interface ILoadSurveys {
  load(): Promise<ISurveyModel[]>;
}
