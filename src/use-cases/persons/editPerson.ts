///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanPerson } from '../../entities';

export const editePerson = async (entityData: Entities.Persons.PersonData) => {



  if (!entityData.id) throw new Error('Id attribute must be provided');
  if (entityData.deleted) delete entityData.deleted;
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'persons') as Entities.Persons.PersonData[];
  if (entityFound.length === 0) throw new Error('The person with the id provided do not exist on the database.');
  const modifiedData = { ...entityFound[0], ...entityData };
  const newEntity = new VolovanPerson(modifiedData);

  return await dep.volovanDb.updateOne(newEntity.getData(), 'persons') as Entities.Persons.PersonData[]

}