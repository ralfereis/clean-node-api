import { AddSurveyModel } from '@/domain/usecases/survey/add-survey';

export interface IAddSurveyRepository {
  add(surveyData: AddSurveyModel): Promise<void>;
}
