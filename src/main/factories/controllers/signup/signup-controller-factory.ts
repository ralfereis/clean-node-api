import { SignUpController } from '../../../../presentation/controllers/login/signup/signup-controller';
import { IController } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbAddAccount } from '../../usecases/add-survey/db-add-survey-factory';
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory';
import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecorator(controller);
};
