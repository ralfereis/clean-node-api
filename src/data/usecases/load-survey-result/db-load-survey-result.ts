import {
  ILoadSurveyResultRepository,
  SurveyResultModel,
  ILoadSurveyResult,
} from './db-load-survey-result-protocols';

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
  ) {}
  async load(surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
    );
    return surveyResult;
  }
}
