/* eslint-disable max-classes-per-file */
import {
  IAddSurvey,
  AddSurveyParams,
} from '@/domain/usecases/survey/add-survey';

import { SurveyModel } from '@/domain/models/survey';
import { mockSurveyModel, mockSurveysModels } from '@/domain/test';
import { ILoadSurveys } from '@/domain/usecases/survey/load-surveys';
import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id';

export const mockAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add(data: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyStub();
};

export const mockLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModels()));
    }
  }
  return new LoadSurveysStub();
};

export const mockLoadSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveyModel()));
    }
  }
  return new LoadSurveyByIdStub();
};
