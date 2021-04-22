export interface ISurveyAnswerModel {
  image?: string;
  answer: string;
}
export interface ISurveyModel {
  id: string;
  question: string;
  answers: ISurveyAnswerModel[];
  date: Date;
}
