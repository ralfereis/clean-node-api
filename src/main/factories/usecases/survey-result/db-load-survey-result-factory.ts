import { DbLoadSurveyResult } from '@/data/usecases';
import { ILoadSurveyResult } from '@/domain/usecases';
import { SurveyResultMongoRepository, SurveyMongoRepository } from '@/infra/db';

export const makeDbLoadSurveyResult = (): ILoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveyMongoRepository,
  );
};
