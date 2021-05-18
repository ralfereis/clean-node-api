import { MongoHelper } from '@/infra/db';
import { mockApolloServer } from './helpers';

import { ApolloServer, gql } from 'apollo-server-express';
import { Collection } from 'mongodb';
import { createTestClient } from 'apollo-server-integration-testing';
import { hash } from 'bcrypt';

let accountCollection: Collection;
let apolloServer: ApolloServer;

describe('Login GraphQL', () => {
  beforeAll(async () => {
    apolloServer = mockApolloServer();
    await MongoHelper.connect(process.env.MONGO_URL);
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('Login Query', () => {
    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `;

    test('Should return an Account on valid credentials', async () => {
      const password = await hash('123', 12);
      await accountCollection.insertOne({
        name: 'Ralfe Reis',
        email: 'ralfe-dev@outlook.com',
        password,
      });

      const { query } = createTestClient({ apolloServer });
      const res: any = await query(loginQuery, {
        variables: {
          email: 'ralfe-dev@outlook.com',
          password: '123',
        },
      });
      expect(res.data.login.accessToken).toBeTruthy();
      expect(res.data.login.name).toBe('Ralfe Reis');
    });

    test('Should return UnauthorizedError on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer });
      const res: any = await query(loginQuery, {
        variables: {
          email: 'rodrigo.manguinho@gmail.com',
          password: '123',
        },
      });
      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe('Unauthorized');
    });
  });
});
