export interface ILoadAnswersBySurvey {
  loadAnswers(id: string): Promise<ILoadAnswersBySurvey.Result>;
}

export namespace ILoadAnswersBySurvey {
  export type Result = string[];
}
