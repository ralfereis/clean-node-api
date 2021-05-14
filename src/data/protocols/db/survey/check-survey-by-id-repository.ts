export interface ICheckSurveyByIdRepository {
  checkById(id: string): Promise<ICheckSurveyByIdRepository.Result>;
}

export namespace ICheckSurveyByIdRepository {
  export type Result = boolean;
}
