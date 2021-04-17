import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository';
import { LoginController } from '../../../../presentation/controllers/login/login-controller';
import { IController } from '../../../../presentation/protocols';
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory';
import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = (): IController => {
  const controller = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  );
  return makeLogControllerDecorator(controller);
};
