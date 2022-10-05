import { volovanDb } from '../../adapters';
import { createRole } from './createRole';
import { findRole } from './findRole';
import { deleteRole } from './deleteRole';
import { editRole } from './editRole';



export const dep = {
  volovanDb
}


export {
  createRole,
  findRole,
  deleteRole,
  editRole
}