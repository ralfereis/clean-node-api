import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result';

export interface ISaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<void>;
}
