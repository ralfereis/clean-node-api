// eslint-disable-next-line max-classes-per-file
import {
  IAddSurveyRepository,
  ICheckSurveyByIdRepository,
  ILoadAnswersBySurveyRepository,
  ILoadSurveyByIdRepository,
  ILoadSurveysRepository,
} from '@/data/protocols';
import { SurveyModel } from '@/domain/models/survey';
import { mockSurveyModel, mockSurveyModels } from '@/../tests/domain/mocks';
import faker from 'faker';

export class AddSurveyRepositorySpy implements IAddSurveyRepository {
  addSurveyParams: IAddSurveyRepository.Params;

  async add(data: IAddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = data;
  }
}

export class LoadSurveyByIdRepositorySpy implements ILoadSurveyByIdRepository {
  result = mockSurveyModel();
  id: string;

  async loadById(id: string): Promise<ILoadSurveyByIdRepository.Result> {
    this.id = id;
    return this.result;
  }
}

export class LoadAnswersBySurveyRepositorySpy
  implements ILoadAnswersBySurveyRepository
{
  result = [faker.random.word(), faker.random.word()];
  id: string;

  async loadAnswers(
    id: string,
  ): Promise<ILoadAnswersBySurveyRepository.Result> {
    this.id = id;
    return this.result;
  }
}

export class CheckSurveyByIdRepositorySpy
  implements ICheckSurveyByIdRepository
{
  result = true;
  id: string;

  async checkById(id: string): Promise<ICheckSurveyByIdRepository.Result> {
    this.id = id;
    return this.result;
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
