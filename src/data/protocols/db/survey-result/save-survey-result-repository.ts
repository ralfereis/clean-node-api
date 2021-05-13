import { SaveSurveyResultParams } from '@/domain/usecases';

export interface ISaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<void>;
}
