import { IController } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { LoadSurveyResultController } from '@/presentation/controllers';
import { makeDbLoadSurveyById, makeDbLoadSurveyResult } from '@/main/factories';

export const makeLoadSurveyResultController = (): IController => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return makeLogControllerDecorator(controller);
};
