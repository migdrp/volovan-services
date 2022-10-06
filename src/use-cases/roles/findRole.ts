///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Find Role Use Case');

export const findRole = async (entityData: Entities.Roles.RoleData) => {

  if (!entityData.deleted) entityData.deleted = false;
  const found = await dep.volovanDb.findByQuery({ id: entityData.id, deleted: false, ...entityData }, 'roles') as Entities.Roles.RoleData[];

  return found;

}