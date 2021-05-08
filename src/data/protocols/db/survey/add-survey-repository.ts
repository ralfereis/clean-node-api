import { AddSurveyParams } from '@/domain/usecases/survey/add-survey';

export interface IAddSurveyRepository {
  add(data: AddSurveyParams): Promise<void>;
}
