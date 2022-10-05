import { dep } from '.';
import { VolovanUser } from '../../entities';

export const removeUserRoles = async (entityData: Entities.Users.UserData) => {

  if (!entityData.id) throw new Error('Id attribute must be provided');
  if (entityData.deleted) delete entityData.deleted;
  if (entityData.password) delete entityData.password;
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'users') as Entities.Users.UserData[];
  if (entityFound.length === 0) throw new Error('The user with the id provided do not exist on the database.');

  if (!entityData.roles) throw new Error('You must provide roles to remove.');
  if (entityData.roles.length === 0) throw new Error('You must provide roles to remove.');

  const dataForEdit: Entities.Users.UserData = {
    id: entityData.id,
    modifiedBy: entityData.modifiedBy,
    modifiedOn: entityData.modifiedOn,
    roles: entityFound[0].roles.filter(oldRole => !entityData.roles.includes(oldRole))
  }

  const modifiedData = { ...entityFound[0], ...dataForEdit };
  modifiedData.roles = dataForEdit.roles;
  const newEntity = new VolovanUser(modifiedData);
  const updated = await dep.volovanDb.updateOne(newEntity.getData(), 'users') as Entities.Users.UserData[];

  const response = updated.map(user => {
    const sanitatedData = user;
    delete sanitatedData.password;
    return sanitatedData;
  });

  return response

}