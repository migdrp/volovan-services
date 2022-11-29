import { volovanDb } from '../../adapters';
import { Names } from '../../utils';
import { createPerson } from './createPerson';
import { deletePerson } from './deletePerson';
import { findPerson } from './findPerson';
import { editePerson } from './editPerson';
import { createManyPersons } from './createManyPersons';



export const dep = {
  volovanDb,
  Names
}


export {
  createPerson,
  deletePerson,
  editePerson,
  findPerson,
  createManyPersons
}