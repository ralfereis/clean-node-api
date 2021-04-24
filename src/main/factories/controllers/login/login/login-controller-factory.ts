import { makeLoginValidation } from './login-validation-factory';
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { LoginController } from '@/presentation/controllers/login/login/login-controller';
import { IController } from '@/presentation/protocols';

export const makeLoginController = (): IController => {
  const controller = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  );
  return makeLogControllerDecorator(controller);
};
