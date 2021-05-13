import { AddSurveyParams } from '@/domain/usecases';

export interface IAddSurveyRepository {
  add(data: AddSurveyParams): Promise<void>;
}
