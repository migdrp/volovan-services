import { volovanDb } from '../../adapters';
import { createOrganization } from './createOrganization';
import { deleteOrganization } from './deleteOrganization';
import { findOrganization } from './findOrganization';
import { editeOrganization } from './editOrganization';



export const dep = {
  volovanDb
}


export {
  createOrganization,
  deleteOrganization,
  editeOrganization,
  findOrganization
}