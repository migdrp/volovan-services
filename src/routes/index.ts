import usersRouter from './usersRouter';
import authRoutes from './authRoutes';
import rolesRouter from './rolesRouter';
import { AuthTokens } from '../utils';

export const dep = {
  AuthTokens
}

export {
  usersRouter,
  authRoutes,
  rolesRouter
}