import { ILoadAnswersBySurveyRepository } from '@/data/protocols';
import { ILoadAnswersBySurvey } from '@/domain/usecases';

export class DbLoadAnswersBySurvey implements ILoadAnswersBySurvey {
  constructor(
    private readonly loadAnswersBySurveyRepository: ILoadAnswersBySurveyRepository,
  ) {}
  async loadAnswers(id: string): Promise<ILoadAnswersBySurvey.Result> {
    return this.loadAnswersBySurveyRepository.loadAnswers(id);
  }
}
