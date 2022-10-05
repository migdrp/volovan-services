import { volovanDb } from '../../adapters';
import { Passwords } from '../../utils/Passwords';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';
import { findUser } from './findUser';
import { editeUser } from './editUsers';
import { removeUserRoles } from './removeUserRoles';



export const dep = {
  volovanDb,
  Passwords
}


export {
  createUser,
  deleteUser,
  editeUser,
  findUser,
  removeUserRoles
}