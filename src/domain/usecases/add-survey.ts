export interface ISurveyAnswer {
  image?: string;
  answer: string;
}

export interface IAddSurveyModel {
  question: string;
  answers: ISurveyAnswer[];
}

export interface IAddSurvey {
  add(data: IAddSurveyModel): Promise<void>;
}
