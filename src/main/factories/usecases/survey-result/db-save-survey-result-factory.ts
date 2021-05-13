import { DbSaveSurveyResult } from '@/data/usecases';
import { ISaveSurveyResult } from '@/domain/usecases';
import { SurveyResultMongoRepository } from '@/infra/db';

export const makeDbSaveSurveyResult = (): ISaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  return new DbSaveSurveyResult(
    surveyResultMongoRepository,
    surveyResultMongoRepository,
  );
};
