/* eslint-disable no-underscore-dangle */
import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

describe('Survey Routes', () => {
  beforeAll(async () => {
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

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
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
        })
        .expect(403);
    });

    test('Should return 204 on add survey with valid accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'Ralfe Reis',
        email: 'ralfe-dev@outlook.com',
        password: 'any_password',
        role: 'admin',
      });
      const id = result.ops[0]._id;
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
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
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
        })
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403);
    });

    test('Should return 200 on load surveys with valid accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'Ralfe Reis',
        email: 'ralfe-dev@outlook.com',
        password: 'any_password',
      });
      const id = result.ops[0]._id;
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
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer',
            },
          ],
          date: new Date(),
        },
      ]);
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
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
        })
        .expect(200);
    });
  });
});
