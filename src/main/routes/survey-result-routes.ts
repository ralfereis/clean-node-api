import {
  makeSaveSurveyResultController,
  makeLoadSurveyResultController,
} from '@/main/factories';
import { adaptRoute } from '@/main/adapters';
import { auth } from '../middlewares/auth';

import { Router } from 'express';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeSaveSurveyResultController()),
  );
  router.get(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeLoadSurveyResultController()),
  );
};
