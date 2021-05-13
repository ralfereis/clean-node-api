import { makeLoginValidation } from './login-validation-factory';
import {
  makeDbAuthentication,
  makeLogControllerDecorator,
} from '@/main/factories';
import { LoginController } from '@/presentation/controllers';
import { IController } from '@/presentation/protocols';

export const makeLoginController = (): IController => {
  const controller = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  );
  return makeLogControllerDecorator(controller);
};
