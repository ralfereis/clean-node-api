import {
  ILoadSurveyResultRepository,
  ISaveSurveyResult,
  ISaveSurveyResultRepository,
  SaveSurveyResultParams,
  SurveyResultModel,
} from './db-save-survey-result-protocols';

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
  ) {}
  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data);
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
    );
    return surveyResult;
  }
}
