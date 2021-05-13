import { makeSignUpValidation } from './signup-validation-factory';
import {
  makeLogControllerDecorator,
  makeDbAddAccount,
  makeDbAuthentication,
} from '@/main/factories';
import { IController } from '@/presentation/protocols';
import { SignUpController } from '@/presentation/controllers';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecorator(controller);
};
