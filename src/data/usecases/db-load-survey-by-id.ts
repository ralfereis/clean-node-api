import { ILoadSurveyByIdRepository } from '@/data/protocols';
import { SurveyModel } from '@/domain/models';
import { ILoadSurveyById } from '@/domain/usecases';

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository,
  ) {}
  async loadById(id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id);
    return survey;
  }
}
