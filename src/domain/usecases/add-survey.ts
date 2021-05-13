import { SurveyModel } from '@/domain/models/survey';

export type AddSurveyParams = Omit<SurveyModel, 'id'>;

export interface IAddSurvey {
  add(data: AddSurveyParams): Promise<void>;
}
