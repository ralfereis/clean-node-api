import { ILoadSurveyByIdRepository } from '@/data/protocols';
import { ILoadSurveyById } from '@/domain/usecases';

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository,
  ) {}
  async loadById(id: string): Promise<ILoadSurveyById.Result> {
    return this.loadSurveyByIdRepository.loadById(id);
  }
}
