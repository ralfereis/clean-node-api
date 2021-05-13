/* eslint-disable max-classes-per-file */
import {
  ISaveSurveyResultRepository,
  ILoadSurveyResultRepository,
} from '@/data/protocols';
import { SurveyResultModel } from '@/domain/models/survey-result';
import { mockSurveyResultModel } from '@/../tests/domain/mocks';
import { SaveSurveyResultParams } from '@/domain/usecases';

export class SaveSurveyResultRepositorySpy
  implements ISaveSurveyResultRepository
{
  saveSurveyResultParams: SaveSurveyResultParams;

  async save(data: SaveSurveyResultParams): Promise<void> {
    this.saveSurveyResultParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveyResultRepositorySpy
  implements ILoadSurveyResultRepository
{
  surveyResultModel = mockSurveyResultModel();
  surveyId: string;
  accountId: string;

  async loadBySurveyId(
    surveyId: string,
    accountId: string,
  ): Promise<SurveyResultModel> {
    this.surveyId = surveyId;
    this.accountId = accountId;
    return Promise.resolve(this.surveyResultModel);
  }
}
