/* eslint-disable max-classes-per-file */
import { SurveyResultModel } from '@/domain/models/survey-result';
import { mockSurveyResultModel } from '@/domain/test';
import { ILoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result';
import {
  ISaveSurveyResult,
  SaveSurveyResultParams,
} from '@/domain/usecases/survey-result/save-survey-result';

export class SaveSurveyResultSpy implements ISaveSurveyResult {
  surveyResultModel = mockSurveyResultModel();
  saveSurveyResultParams: SaveSurveyResultParams;

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data;
    return Promise.resolve(this.surveyResultModel);
  }
}

export class LoadSurveyResultSpy implements ILoadSurveyResult {
  surveyResultModel = mockSurveyResultModel();
  surveyId: string;
  accountId: string;

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId;
    this.accountId = accountId;
    return this.surveyResultModel;
  }
}
