import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result';
import { SurveyResultModel } from '@/domain/models/survey-result';

export interface ISaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
