import { SurveyModel } from '@/domain/models/survey';

export type AddSurveyModel = Omit<SurveyModel, 'id'>;

export interface IAddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
