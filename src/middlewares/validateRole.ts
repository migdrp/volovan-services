///<reference path="../types/types.d.ts" />

import { NextFunction, Response, Request } from 'express';
import { dep } from '.';
import { Logger } from '../utils';
import { findRole } from '../use-cases/roles'

const log = new Logger('Validate role middleware');

export function validateRole(role: string[]) {

  return async (req: Request, res: Response, next: NextFunction) => {

    try {

      if (!req['userData'])
        throw new Error('Not authorized')


      const userRolesIds = (req['userData'] as Entities.Users.UserData).roles;

      const allRoles = await findRole({});

      const userRoles = allRoles.filter(role => userRolesIds.includes(role.id));
      const userRolesNames = userRoles.map(role => role.name);

      if (!role.some(role => userRolesNames.includes(role)))
        throw new Error('Not authorized')

      next();
    } catch (err) {
      log.error(err.stack || err);
      res.json({ status: 'error', message: err.message });
    }

  }

}