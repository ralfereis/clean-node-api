// eslint-disable-next-line max-classes-per-file
import { IAddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository';
import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository';
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';
import { SurveyModel } from '@/domain/models/survey';
import { mockSurveyModel, mockSurveysModels } from '@/domain/test';
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey';

export const mockAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    add(surveyData: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveyModel()));
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepository = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    loadAll(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModels()));
    }
  }
  return new LoadSurveysRepositoryStub();
};
