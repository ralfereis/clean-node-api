import { ICheckSurveyByIdRepository } from '@/data/protocols';
import { ICheckSurveyById } from '@/domain/usecases';

export class DbCheckSurveyById implements ICheckSurveyById {
  constructor(
    private readonly checkSurveyByIdRepository: ICheckSurveyByIdRepository,
  ) {}
  async checkById(id: string): Promise<ICheckSurveyById.Result> {
    return this.checkSurveyByIdRepository.checkById(id);
  }
}
