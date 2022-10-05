import { dep } from '.';
import { VolovanRole } from '../../entities';

export const editRole = async (entityData: Entities.Roles.RoleData) => {

  if (!entityData.id) throw new Error('Id attribute must be provided');
  if (entityData.deleted) delete entityData.deleted;
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'roles') as Entities.Roles.RoleData[];
  if (entityFound.length === 0) throw new Error('The role with the id provided do not exist on the database.');
  const modifiedData = { ...entityFound[0], ...entityData };
  const newEntity = new VolovanRole(modifiedData);

  return await dep.volovanDb.updateOne(newEntity.getData(), 'roles') as Entities.Roles.RoleData[]

}