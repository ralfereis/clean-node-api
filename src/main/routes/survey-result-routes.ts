import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory';
import { adaptRoute } from '../adapter/express-route-adapter';
import { auth } from '../middlewares/auth';
import { Router } from 'express';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeSaveSurveyResultController()),
  );
};
