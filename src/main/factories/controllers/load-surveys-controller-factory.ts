import { LoadSurveysController } from '@/presentation/controllers';
import { IController } from '@/presentation/protocols';
import {
  makeLogControllerDecorator,
  makeDbLoadSurveys,
} from '@/main/factories';

export const makeLoadSurveysController = (): IController => {
  const controller = new LoadSurveysController(makeDbLoadSurveys());
  return makeLogControllerDecorator(controller);
};
