/* eslint-disable max-classes-per-file */
import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository';
import { ILoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository';
import { SurveyResultModel } from '@/domain/models/survey-result';
import { mockSurveyResultModel } from '@/domain/test';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result';

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
