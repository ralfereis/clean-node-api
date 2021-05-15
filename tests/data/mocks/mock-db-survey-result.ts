/* eslint-disable max-classes-per-file */
import {
  ISaveSurveyResultRepository,
  ILoadSurveyResultRepository,
} from '@/data/protocols';
import { mockSurveyResultModel } from '@/../tests/domain/mocks';
import { ISaveSurveyResult } from '@/domain/usecases';

export class SaveSurveyResultRepositorySpy
  implements ISaveSurveyResultRepository
{
  saveSurveyResultParams: ISaveSurveyResult.Params;

  async save(data: ISaveSurveyResult.Params): Promise<void> {
    this.saveSurveyResultParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveyResultRepositorySpy
  implements ILoadSurveyResultRepository
{
  result = mockSurveyResultModel();
  surveyId: string;
  accountId: string;

  async loadBySurveyId(
    surveyId: string,
    accountId: string,
  ): Promise<ILoadSurveyResultRepository.Result> {
    this.surveyId = surveyId;
    this.accountId = accountId;
    return this.result;
  }
}
