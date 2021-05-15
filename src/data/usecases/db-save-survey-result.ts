import {
  ILoadSurveyResultRepository,
  ISaveSurveyResultRepository,
} from '@/data/protocols';
import { ISaveSurveyResult } from '@/domain/usecases';

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
  ) {}
  async save(
    data: ISaveSurveyResult.Params,
  ): Promise<ISaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data);
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
      data.accountId,
    );
    return surveyResult;
  }
}
