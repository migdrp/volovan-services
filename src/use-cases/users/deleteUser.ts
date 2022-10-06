///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Delete Users Use Case');

export const deleteUser = async (entityData: Entities.Users.UserData) => {

  if (!entityData.id) throw new Error('You must enter the user id to complete the operation');
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'users') as Entities.Users.UserData[];


  if (entityFound.length === 0)
    throw new Error('The user id provided was not found in the database.')

  const data = entityFound[0];
  data.deleted = true;

  const deleted = await dep.volovanDb.updateOne({ id: data.id, ...data }, 'users') as Entities.Users.UserData[];

  return deleted;

}