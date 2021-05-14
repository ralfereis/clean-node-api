import { DbCheckSurveyById } from '@/data/usecases';
import { ICheckSurveyById } from '@/domain/usecases';
import { SurveyMongoRepository } from '@/infra/db';

export const makeDbCheckSurveyById = (): ICheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbCheckSurveyById(surveyMongoRepository);
};
