import { SurveyAnswerModel } from '@/domain/models/survey';

export type AddSurveyModel = {
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
};

export interface IAddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
