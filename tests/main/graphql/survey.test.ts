/* eslint-disable no-underscore-dangle */
import { mockApolloServer } from './helpers';
import { MongoHelper } from '@/infra/db';
import env from '@/main/config/env';

import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';

let surveyCollection: Collection;
let accountCollection: Collection;
let apolloServer: ApolloServer;

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Ralfe Reis',
    email: 'ralfe-dev@outlook.com',
    password: '123',
    role: 'admin',
  });
  const id = res.ops[0]._id;
  const accessToken = sign({ id }, env.jwtSecret);
  await accountCollection.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        accessToken,
      },
    },
  );
  return accessToken;
};

describe('Survey GraphQL', () => {
  beforeAll(async () => {
    apolloServer = mockApolloServer();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('Surveys Query', () => {
    const surveysQuery = gql`
      query surveys {
        surveys {
          id
          question
          answers {
            image
            answer
          }
          date
          didAnswer
        }
      }
    `;

    test('Should return Surveys', async () => {
      const accessToken = await mockAccessToken();
      const now = new Date();
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: now,
      });
      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken,
          },
        },
      });
      const res: any = await query(surveysQuery);
      expect(res.data.surveys.length).toBe(1);
      expect(res.data.surveys[0].id).toBeTruthy();
      expect(res.data.surveys[0].question).toBe('Question');
      expect(res.data.surveys[0].date).toBe(now.toISOString());
      expect(res.data.surveys[0].didAnswer).toBe(false);
      expect(res.data.surveys[0].answers).toEqual([
        {
          answer: 'Answer 1',
          image: 'http://image-name.com',
        },
        {
          answer: 'Answer 2',
          image: null,
        },
      ]);
    });

    test('Should return AccessDeniedError if no token is provided', async () => {
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: new Date(),
      });
      const { query } = createTestClient({ apolloServer });
      const res: any = await query(surveysQuery);
      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe('Access denied');
    });
  });

  describe('SaveSurveyResult Mutation', () => {
    const saveSurveyResultMutation = gql`
      mutation saveSurveyResult($surveyId: String!, $answer: String!) {
        saveSurveyResult(surveyId: $surveyId, answer: $answer) {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }
    `;

    test('Should return SurveyResult', async () => {
      const accessToken = await mockAccessToken();
      const now = new Date();
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: now,
      });
      const { mutate } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken,
          },
        },
      });
      const res: any = await mutate(saveSurveyResultMutation, {
        variables: {
          surveyId: surveyRes.ops[0]._id.toString(),
          answer: 'Answer 1',
        },
      });
      expect(res.data.saveSurveyResult.question).toBe('Question');
      expect(res.data.saveSurveyResult.date).toBe(now.toISOString());
      expect(res.data.saveSurveyResult.answers).toEqual([
        {
          answer: 'Answer 1',
          count: 1,
          percent: 100,
          isCurrentAccountAnswer: true,
        },
        {
          answer: 'Answer 2',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false,
        },
      ]);
    });

    test('Should return AccessDeniedError if no token is provided', async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: new Date(),
      });
      const { mutate } = createTestClient({ apolloServer });
      const res: any = await mutate(saveSurveyResultMutation, {
        variables: {
          surveyId: surveyRes.ops[0]._id.toString(),
          answer: 'Answer 1',
        },
      });
      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe('Access denied');
    });
  });
});
