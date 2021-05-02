import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository';
import { SurveyResultModel } from '@/domain/models/survey-result';
import { mockSurveyResultModel } from '@/domain/test';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result';

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultRepositoryStub();
};
