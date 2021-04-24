import { MongoHelper } from '../helpers/mongo-helper';
import { ISurveyModel } from '@/domain/models/survey';
import { IAddSurveyModel } from '@/domain/usecases/add-survey';
import { IAddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository';
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';

export class SurveyMongoRepository
  implements IAddSurveyRepository, ILoadSurveysRepository {
  async add(surveyData: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<ISurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys: ISurveyModel[] = await surveyCollection.find().toArray();
    return surveys;
  }
}
