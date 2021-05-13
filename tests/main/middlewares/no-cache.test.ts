import app from '@/main/config/app';
import request from 'supertest';
import { noCache } from '@/main/middlewares';

describe('NoCache Middleware', () => {
  test('Should disable cache', async () => {
    app.get('/test_no-cache', noCache, (request, response) => {
      response.send();
    });
    await request(app)
      .get('/test_no-cache')
      .expect(
        'cache-control',
        'no-store, no-cache, must-revalidate, proxy-revalidate',
      )
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store');
  });
});
