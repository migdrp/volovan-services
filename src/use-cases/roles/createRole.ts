///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanRole } from '../../entities';

export const createRole = async (entityData: Entities.Roles.RoleData) => {

  const newEntity = new VolovanRole(entityData);
  const entityFound = await dep.volovanDb.findByQuery({ name: newEntity.name, deleted: false }, 'roles');

  if (entityFound.length)
    throw new Error('A role with the same name is already registered.')

  return await dep.volovanDb.insertOne(newEntity.getData(), 'roles') as Entities.Users.UserData[]

}