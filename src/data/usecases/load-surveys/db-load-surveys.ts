import { ISurveyModel } from '../../../domain/models/survey';
import { ILoadSurveys } from '../../../domain/usecases/load-surveys';
import { ILoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository';

export class DbLoadSurveys implements ILoadSurveys {
  constructor(private readonly loadSurveysRepository: ILoadSurveysRepository) {}
  async load(): Promise<ISurveyModel[]> {
    await this.loadSurveysRepository.loadAll();
    return [];
  }
}
