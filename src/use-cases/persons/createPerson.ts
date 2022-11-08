///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanPerson } from '../../entities';

export const createPerson = async (PersonData: Entities.Persons.PersonData) => {


  const newPerson = new VolovanPerson(PersonData);
  const personFound = await dep.volovanDb.findByQuery({ firstNames: newPerson.firstNames, lastNames: newPerson.lastNames, email: newPerson.email, deleted: false }, 'persons');

  if (personFound.length > 0)
    throw new Error('A Person with the same name and email is already registered.')


  return await dep.volovanDb.insertOne(newPerson.getData(), 'persons') as Entities.Persons.PersonData[]



}