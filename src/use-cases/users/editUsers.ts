///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanUser } from '../../entities';

export const editeUser = async (entityData: Entities.Users.UserData) => {


  if (!entityData.id) throw new Error('Id attribute must be provided');
  if (entityData.deleted) delete entityData.deleted;
  if (entityData.password) delete entityData.password;
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'users') as Entities.Users.UserData[];
  if (entityFound.length === 0) throw new Error('The user with the id provided do not exist on the database.');


  if (entityData.roles) {
    if (entityData.roles.length > 0) {
      const rolesThatExist = await dep.volovanDb.findManyWithIdsAray(entityData.roles, 'roles') as Entities.Roles.RoleData[];
      if (rolesThatExist.length != entityData.roles.length) {
        const rolesIdsThatExist = rolesThatExist.map(role => role.id);
        const rolesThatNotExist = entityData.roles.filter(role => !rolesIdsThatExist.includes(role));
        throw Error(`Some of the roles that you are tryng to asign to the user do not exist. (${rolesThatNotExist.join()})`);
      }
    }
  }
  const mergedRoles = [...entityFound[0].roles.filter(oldRole => !entityData.roles.includes(oldRole)), ...entityData.roles];
  const modifiedData = { ...entityFound[0], ...entityData };
  modifiedData.roles = mergedRoles;
  const newEntity = new VolovanUser(modifiedData);
  const updated = await dep.volovanDb.updateOne(newEntity.getData(), 'users') as Entities.Users.UserData[];

  const response = updated.map(user => {
    const sanitatedData = user;
    delete sanitatedData.password;
    return sanitatedData;
  });

  return response

}