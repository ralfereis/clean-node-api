import { DbLoadSurveyById } from '@/data/usecases';
import { ILoadSurveyById } from '@/domain/usecases';
import { SurveyMongoRepository } from '@/infra/db';

export const makeDbLoadSurveyById = (): ILoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyById(surveyMongoRepository);
};
