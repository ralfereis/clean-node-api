import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import {
  makeAddSurveyController,
  makeLoadSurveysController,
} from '@/main/factories';

import { adminAuth } from '../middlewares/admin-auth';
import { auth } from '../middlewares/auth';

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()));
};
