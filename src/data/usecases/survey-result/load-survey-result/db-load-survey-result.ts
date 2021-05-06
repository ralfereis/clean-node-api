import {
  ILoadSurveyResultRepository,
  SurveyResultModel,
  ILoadSurveyResult,
  ILoadSurveyByIdRepository,
} from './db-load-survey-result-protocols';

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository,
  ) {}
  async load(surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
    );
    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId);
    }
    return surveyResult;
  }
}
