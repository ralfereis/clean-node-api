import { DbLoadAnswersBySurvey } from '@/data/usecases';
import { ILoadAnswersBySurvey } from '@/domain/usecases';
import { SurveyMongoRepository } from '@/infra/db';

export const makeDbLoadAnswersBySurvey = (): ILoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadAnswersBySurvey(surveyMongoRepository);
};
