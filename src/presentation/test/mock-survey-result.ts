import { SurveyResultModel } from '@/domain/models/survey-result';
import { mockSurveyResultModel } from '@/domain/test';
import {
  ISaveSurveyResult,
  SaveSurveyResultParams,
} from '@/domain/usecases/survey-result/save-survey-result';

export const mockSaveSurveyResult = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultStub();
};
