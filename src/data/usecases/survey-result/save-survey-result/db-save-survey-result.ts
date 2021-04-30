import {
  ISaveSurveyResult,
  ISaveSurveyResultRepository,
  SaveSurveyResultParams,
  SurveyResultModel,
} from './db-save-survey-result-protocols';

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
  ) {}
  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data);
    return surveyResult;
  }
}
