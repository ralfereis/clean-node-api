import { AddSurveyParams } from '@/domain/usecases/survey/add-survey';

export interface IAddSurveyRepository {
  add(surveyData: AddSurveyParams): Promise<void>;
}
