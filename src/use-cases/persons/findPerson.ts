///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Find Persons Use Case');

export const findPerson = async (entityData: Entities.Persons.PersonData) => {

  if (!entityData.deleted) entityData.deleted = false;
  const found = await dep.volovanDb.findByQuery({ ...entityData }, 'persons') as Entities.Persons.PersonData[];


  return found;
}