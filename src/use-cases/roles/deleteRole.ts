import { dep } from '.';
import { VolovanRole } from '../../entities';
import { Logger } from '../../utils';

const log = new Logger('Delete Role Use Case');

export const deleteRole = async (entityData: Entities.Roles.RoleData) => {

  if (!entityData.id) throw new Error('You must enter the role to complete the operation');
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'roles') as Entities.Roles.RoleData[];

  if (entityFound.length === 0)
    throw new Error('The role provided was not found in the database.')


  const usersWithRole = await dep.volovanDb.findByQuery({ roles: [entityData.id] }, 'users') as Entities.Users.UserData[];

  const dataForDeletion = entityFound[0];

  if (usersWithRole.length === 0) {
    dataForDeletion.deleted = true;
    const deleted = await dep.volovanDb.updateOne({ id: dataForDeletion.id, ...dataForDeletion }, 'roles') as Entities.Roles.RoleData[];
    return deleted;

  } else {
    log.debug('Users with role found: ', usersWithRole);

    const usersUpdated = [];
    for (let x = 0; x < usersWithRole.length; x++) {
      const currentUser = usersWithRole[x];
      currentUser.roles = currentUser.roles.filter(role => role !== dataForDeletion.id);
      usersUpdated.push(currentUser);
    }

    const modifiedUsers = await dep.volovanDb.updateMany(usersUpdated, 'users') as Entities.Users.UserData[];
    log.debug('Role removed from users: ', modifiedUsers)
    const deleted = await dep.volovanDb.updateOne({ id: dataForDeletion.id, ...dataForDeletion }, 'roles') as Entities.Roles.RoleData[];
    return deleted;
  }


}