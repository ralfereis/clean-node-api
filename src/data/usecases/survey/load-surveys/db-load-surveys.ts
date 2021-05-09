import {
  SurveyModel,
  ILoadSurveys,
  ILoadSurveysRepository,
} from './db-load-surveys-protocols';

export class DbLoadSurveys implements ILoadSurveys {
  constructor(private readonly loadSurveysRepository: ILoadSurveysRepository) {}
  async load(accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId);
    return surveys;
  }
}
