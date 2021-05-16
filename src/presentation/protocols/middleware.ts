import { HttpResponse } from '@/presentation/protocols';

export interface IMiddleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>;
}
