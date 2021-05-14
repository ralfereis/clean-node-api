import { ILoadSurveyByIdRepository } from '@/data/protocols';
import { ILoadAnswersBySurvey } from '@/domain/usecases';

export class DbLoadAnswersBySurvey implements ILoadAnswersBySurvey {
  constructor(
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository,
  ) {}
  async loadAnswers(id: string): Promise<ILoadAnswersBySurvey.Result> {
    const survey = await this.loadSurveyByIdRepository.loadById(id);
    return survey?.answers.map(a => a.answer) || [];
  }
}
