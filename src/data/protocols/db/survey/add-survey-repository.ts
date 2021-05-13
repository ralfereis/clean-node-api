import { IAddSurvey } from '@/domain/usecases';

export interface IAddSurveyRepository {
  add(data: IAddSurveyRepository.Params): Promise<void>;
}

export namespace IAddSurveyRepository {
  export type Params = IAddSurvey.Params;
}
