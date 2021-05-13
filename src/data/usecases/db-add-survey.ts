import { IAddSurvey, AddSurveyParams } from '@/domain/usecases';
import { IAddSurveyRepository } from '@/data/protocols';

export class DbAddSurvey implements IAddSurvey {
  constructor(private readonly addSurveyRepository: IAddSurveyRepository) {}
  async add(data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data);
  }
}
