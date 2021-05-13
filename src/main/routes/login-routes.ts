import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeLoginController, makeSignUpController } from '@/main/factories';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
