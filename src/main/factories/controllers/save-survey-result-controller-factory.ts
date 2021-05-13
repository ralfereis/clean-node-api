import { IController } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { SaveSurveyResultController } from '@/presentation/controllers';
import {
  makeDbLoadSurveyById,
  makeDbSaveSurveyResult,
} from '@/main/factories/usecases';

export const makeSaveSurveyResultController = (): IController => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResult(),
  );
  return makeLogControllerDecorator(controller);
};
