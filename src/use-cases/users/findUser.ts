///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Find Users Use Case');

export const findUser = async (entityData: Entities.Users.UserData) => {

  if (!entityData.deleted) entityData.deleted = false;
  const found = await dep.volovanDb.findByQuery({ ...entityData }, 'users') as Entities.Users.UserData[];

  const response = found.map(user => {
    const sanitatedData = user;
    delete sanitatedData.password;
    return sanitatedData;
  });

  return response;
}