// eslint-disable-next-line max-classes-per-file
import {
  IAddSurveyRepository,
  ILoadSurveyByIdRepository,
  ILoadSurveysRepository,
} from '@/data/protocols';
import { SurveyModel } from '@/domain/models/survey';
import { mockSurveyModel, mockSurveyModels } from '@/../tests/domain/mocks';

export class AddSurveyRepositorySpy implements IAddSurveyRepository {
  addSurveyParams: IAddSurveyRepository.Params;

  async add(data: IAddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = data;
  }
}

export class LoadSurveyByIdRepositorySpy implements ILoadSurveyByIdRepository {
  surveyModel = mockSurveyModel();
  id: string;

  async loadById(id: string): Promise<SurveyModel> {
    this.id = id;
    return this.surveyModel;
  }
}

export class LoadSurveysRepositorySpy implements ILoadSurveysRepository {
  surveyModels = mockSurveyModels();
  accountId: string;

  async loadAll(accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId;
    return this.surveyModels;
  }
}
