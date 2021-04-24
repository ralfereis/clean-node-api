import { IController } from '@/presentation/protocols';
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository';
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator';

export const makeLogControllerDecorator = (
  controller: IController,
): IController => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
