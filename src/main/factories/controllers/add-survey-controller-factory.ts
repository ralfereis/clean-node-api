import { makeAddSurveyValidation } from './add-survey-validation-factory';
import { AddSurveyController } from '@/presentation/controllers';
import { IController } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { makeDbAddSurvey } from '@/main/factories';

export const makeAddSurveyController = (): IController => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  );
  return makeLogControllerDecorator(controller);
};
