import { adaptMiddleware } from '@/main/adapters';
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory';

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
