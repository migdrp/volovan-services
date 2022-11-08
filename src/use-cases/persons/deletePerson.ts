///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Delete Persons Use Case');

export const deletePerson = async (entityData: Entities.Persons.PersonData) => {

  if (!entityData.id) throw new Error('You must enter the person id to complete the operation');
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'persons') as Entities.Persons.PersonData[];


  if (entityFound.length === 0)
    throw new Error('The person id provided was not found in the database.')

  const data = entityFound[0];
  data.deleted = true;

  const deleted = await dep.volovanDb.updateOne({ id: data.id, ...data }, 'persons') as Entities.Persons.PersonData[];

  return deleted;

}