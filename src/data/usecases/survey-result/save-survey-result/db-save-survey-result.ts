import {
  ISaveSurveyResult,
  ISaveSurveyResultRepository,
  SaveSurveyResultModel,
  SurveyResultModel,
} from './db-save-survey-result-protocols';

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
  ) {}
  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data);
    return surveyResult;
  }
}
