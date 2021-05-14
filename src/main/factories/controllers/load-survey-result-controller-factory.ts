import { IController } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { LoadSurveyResultController } from '@/presentation/controllers';
import {
  makeDbCheckSurveyById,
  makeDbLoadSurveyResult,
} from '@/main/factories';

export const makeLoadSurveyResultController = (): IController => {
  const controller = new LoadSurveyResultController(
    makeDbCheckSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return makeLogControllerDecorator(controller);
};
