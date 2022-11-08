import { volovanDb } from '../../adapters';
import { createPerson } from './createPerson';
import { deletePerson } from './deletePerson';
import { findPerson } from './findPerson';
import { editePerson } from './editPerson';



export const dep = {
  volovanDb
}


export {
  createPerson,
  deletePerson,
  editePerson,
  findPerson
}