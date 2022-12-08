///<reference path="../types/types.d.ts" />


import express, { NextFunction, Response, Request } from 'express';
import { validateToken } from '../middlewares';
import { verifyUserData, saveUserToken, refreshUserToken, destroyUserToken } from '../use-cases/auth';
import { Logger } from '../utils/Logger';

const log = new Logger('Auth Router');

const router = express.Router();

router.post(`/login`, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: Entities.Auth.LoginData = req.body;
    const userDataVerified = await verifyUserData({ email, password });

    if (!userDataVerified)
      return res.json({ status: 'error', message: 'Error login user' });

    const { accessToken, refreshToken } = await saveUserToken(userDataVerified);

    req.body.userData = userDataVerified;
    req.body.accessToken = accessToken;
    req.body.refreshToken = refreshToken;

    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: parseInt(process.env.JWT_ACCESS_TIME) * 1000, sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', secure: process.env.NODE_ENV === 'production' });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: parseInt(process.env.JWT_REFRESH_TIME) * 1000, sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', secure: process.env.NODE_ENV === 'production' });

    req.headers.authorization = `Bearer ${accessToken}`;
    res.json({
      status: 'success',
      message: 'User successfully logedin.',
      data: [{
        userDataVerified,
        accessToken,
        refreshToken
      }]
    });

  } catch (err) {
    log.error(err.stack || err);
    res.json({ status: 'error', message: err.message });
  }
});



router.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {

    let token = null;
    const cookies = req.cookies || false;
    if (cookies) {
      token = cookies.refreshToken;
      if (!token) throw new Error('No refresh token found.');
    } else {
      throw new Error('No refresh token found.');
    }

    const { accessToken, refreshToken, userData } = await refreshUserToken(token);

    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: parseInt(process.env.JWT_ACCESS_TIME) * 1000 });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: parseInt(process.env.JWT_REFRESH_TIME) * 1000 });
    req.headers.authorization = `Bearer ${accessToken}`;

    res.json({
      status: 'success',
      message: 'User session successfully refreshed.',
      data: [{
        userData,
        accessToken,
        refreshToken
      }]

    });

  } catch (err) {
    log.error(err.stack || err);
    res.json({ status: 'error', message: err.message });
  }
});


router.get('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {

    const authHeader = req.headers["authorization"];
    const cookies = req.cookies || false;
    let tokenFromHeader = null;
    let accessToken = null;
    let refreshToken = null;
    let userData = null;

    if (authHeader)
      tokenFromHeader = authHeader.split(" ")[1]


    if (cookies) {
      accessToken = cookies.accessToken;
      refreshToken = cookies.refreshToken;
    }


    if (!refreshToken && !accessToken && !tokenFromHeader) throw new Error('Not user session found.');

    userData = await destroyUserToken(refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({
      status: 'success',
      message: 'User session closed.',
      data: [{
        userData
      }]

    });
  } catch (err) {
    log.error(err.stack || err);
    res.json({ status: 'error', message: err.message });
  }

});


router.get('/session', validateToken, (req, res) => {
  res.json({
    status: 'success',
    message: 'User session info.',
    data: [
      req['userData']
    ]

  });
});


router.get('/isalive', validateToken, (req, res) => {
  res.json({
    status: 'success',
    message: 'User session found.',
    data: [
      req['userData']
    ]

  });
});



router.get('/test', (req, res) => {
  log.debug('Check cookies: ', req.cookies);
  res.json({ cookies: req.cookies });
});




export default router;


