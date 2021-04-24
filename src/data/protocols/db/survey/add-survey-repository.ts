import { AddSurveyModel } from '@/domain/usecases/add-survey';

export interface IAddSurveyRepository {
  add(surveyData: AddSurveyModel): Promise<void>;
}
