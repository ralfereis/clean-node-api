import { ILogErrorRepository } from '@/data/protocols/db/log/log-error-repository';

export const mockLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepository implements ILogErrorRepository {
    async logError(stack: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new LogErrorRepository();
};
