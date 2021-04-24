import { makeSignUpValidation } from './signup-validation-factory';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory';
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory';
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller';
import { IController } from '@/presentation/protocols';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecorator(controller);
};
