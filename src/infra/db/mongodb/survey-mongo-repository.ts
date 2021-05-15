import { MongoHelper, QueryBuilder } from '@/infra/db';
import {
  IAddSurveyRepository,
  ILoadSurveysRepository,
  ILoadSurveyByIdRepository,
  ICheckSurveyByIdRepository,
  ILoadAnswersBySurveyRepository,
} from '@/data/protocols/';

import { ObjectId } from 'mongodb';

export class SurveyMongoRepository
  implements
    IAddSurveyRepository,
    ILoadSurveysRepository,
    ILoadSurveyByIdRepository,
    ICheckSurveyByIdRepository,
    ILoadAnswersBySurveyRepository
{
  async add(data: IAddSurveyRepository.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(data);
  }

  async loadAll(accountId: string): Promise<ILoadSurveysRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result',
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.accountId', new ObjectId(accountId)],
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();
    const surveys = await surveyCollection.aggregate(query).toArray();
    return MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<ILoadSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return survey && MongoHelper.map(survey);
  }

  async loadAnswers(
    id: string,
  ): Promise<ILoadAnswersBySurveyRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const query = new QueryBuilder()
      .match({ _id: new ObjectId(id) })
      .project({ _id: 0, answers: '$answers.answer' })
      .build();

    const surveys = await surveyCollection.aggregate(query).toArray();
    return surveys[0]?.answers || [];
  }

  async checkById(id: string): Promise<ICheckSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 1 } },
    );
    return survey !== null;
  }
}
