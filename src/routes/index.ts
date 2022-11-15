import usersRouter from './usersRouter';
import authRoutes from './authRoutes';
import rolesRouter from './rolesRouter';
import participantsRouter from './participantsRouter';
import personsRouter from './personsRouter';
import eventsRouter from './eventsRouter';
import ticketsRouter from './ticketsRouter';
import eventsPublicRouter from './eventsPublicRouter';

import { AuthTokens } from '../utils';

export const dep = {
  AuthTokens
}

export {
  usersRouter,
  authRoutes,
  rolesRouter,
  participantsRouter,
  personsRouter,
  eventsRouter,
  ticketsRouter,
  eventsPublicRouter

}