/* eslint-disable max-classes-per-file */
import {
  IAddSurvey,
  AddSurveyParams,
} from '@/domain/usecases/survey/add-survey';

import { SurveyModel } from '@/domain/models/survey';
import { mockSurveyModel, mockSurveyModels } from '@/domain/test';
import { ILoadSurveys } from '@/domain/usecases/survey/load-surveys';
import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id';

export class AddSurveySpy implements IAddSurvey {
  addSurveyParams: AddSurveyParams;

  async add(data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveysSpy implements ILoadSurveys {
  surveyModels = mockSurveyModels();
  callsCount = 0;

  async load(): Promise<SurveyModel[]> {
    this.callsCount++;
    return Promise.resolve(this.surveyModels);
  }
}

export class LoadSurveyByIdSpy implements ILoadSurveyById {
  surveyModel = mockSurveyModel();
  id: string;

  async loadById(id: string): Promise<SurveyModel> {
    this.id = id;
    return Promise.resolve(this.surveyModel);
  }
}
