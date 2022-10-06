///<reference path="../types/types.d.ts" />

import { NextFunction, Response, Request } from 'express';
import { dep } from '.';
import { Logger } from '../utils';

const log = new Logger('Validate token middleware');

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const authHeader = req.headers["authorization"];
    const cookies = req.cookies || false;
    let tokenFromHeader = null;
    let cookieAccessToken = null;
    let cookieRefreshToken = null;
    let tokenFound = null;
    let refreshTokenFound = null;

    if (authHeader)
      tokenFromHeader = authHeader.split(" ")[1]

    if (cookies) {
      cookieAccessToken = cookies.accessToken;
      cookieRefreshToken = cookies.refreshToken;
    }


    if (!cookieRefreshToken && !cookieAccessToken && !tokenFromHeader) throw new Error('User not authorized.');


    tokenFound = tokenFromHeader || cookieAccessToken;
    refreshTokenFound = cookieRefreshToken;

    //log.debug('tokenFound:', tokenFound)
    //log.debug('refreshTokenFound:', refreshTokenFound)
    //log.debug('authHeader', authHeader)

    if (!tokenFound && !refreshTokenFound) {
      res.json({ status: 'error', message: 'User not authorized.' });
    }

    if (!tokenFound && refreshTokenFound) {
      //log.debug('Token not found but refreshToken Found');
      const { userData, accessToken, refreshToken } = await dep.refreshUserToken(refreshTokenFound);
      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: parseInt(process.env.JWT_ACCESS_TIME) * 1000 });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: parseInt(process.env.JWT_REFRESH_TIME) * 1000 });
      req.headers.authorization = `Bearer ${accessToken}`;
      req['userData'] = userData;
    }

    if (tokenFound) {
      const verifiedToken = dep.AuthTokens.verifyToken(tokenFound);
      req['userData'] = verifiedToken.sub;
    }

    next();
  } catch (err) {
    log.error(err.stack || err);
    res.json({ status: 'error', message: err.message });
  }

} 