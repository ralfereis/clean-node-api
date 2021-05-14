export interface ILoadAnswersBySurveyRepository {
  loadAnswers(id: string): Promise<ILoadAnswersBySurveyRepository.Result>;
}

export namespace ILoadAnswersBySurveyRepository {
  export type Result = string[];
}
