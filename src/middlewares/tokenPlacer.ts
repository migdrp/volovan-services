///<reference path="../types/types.d.ts" />

import { NextFunction, Response, Request } from 'express';
import { Logger } from '../utils';

const log = new Logger('Token PLacer Middleware');


export const tokenPlacer = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies || false;
  if (cookies) {
    let token = cookies.accessToken;
    if (token) req.headers.authorization = `Bearer ${token}`;
  }
  next();
};