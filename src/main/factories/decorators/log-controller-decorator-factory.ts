import { IController } from '@/presentation/protocols';
import { LogMongoRepository } from '@/infra/db';
import { LogControllerDecorator } from '@/main/decorators';

export const makeLogControllerDecorator = (
  controller: IController,
): IController => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
