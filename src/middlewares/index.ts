import { tokenPlacer } from './tokenPlacer';
import { validateToken } from './validateToken';

import { AuthTokens } from '../utils/AuthTokens';
import { refreshUserToken } from '../use-cases/auth';


export const dep = {
  AuthTokens,
  refreshUserToken
}

export {
  tokenPlacer,
  validateToken
}