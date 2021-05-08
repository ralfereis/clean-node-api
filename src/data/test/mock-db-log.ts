import { ILogErrorRepository } from '@/data/protocols/db/log/log-error-repository';

export class LogErrorRepositorySpy implements ILogErrorRepository {
  stack: string;

  async logError(stack: string): Promise<void> {
    this.stack = stack;
    return Promise.resolve();
  }
}
