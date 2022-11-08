///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Refresh User Token Use Case');

export const refreshUserToken = async (token: string) => {
  try {

    const validatedToken = dep.AuthTokens.verifyToken(token);
    const userData = validatedToken.sub as Entities.Users.UserData;

    //log.debug('validatedToken: ', validatedToken)

    const tokenExist: Entities.Auth.TokenData[] = await dep.volovanDb.findByQuery({ id: userData.id, token: token }, 'tokens');
    //log.debug('tokenExist: ', tokenExist)


    const accessToken = dep.AuthTokens.generateAccessToken(userData);
    const refreshToken = dep.AuthTokens.generateRefreshToken(userData);

    if (tokenExist.length > 0) {
      const data = { token: refreshToken };
      await dep.volovanDb.updateOne({ id: userData.id, ...data }, 'tokens');
    } else {
      throw new Error('The refresh token  is invalid.')
    }

    return { accessToken, refreshToken, userData };
  } catch (err) {
    log.error(err.stack || err);
    throw err;
  }
}