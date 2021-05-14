export interface ICheckSurveyById {
  checkById(id: string): Promise<ICheckSurveyById.Result>;
}

export namespace ICheckSurveyById {
  export type Result = boolean;
}
