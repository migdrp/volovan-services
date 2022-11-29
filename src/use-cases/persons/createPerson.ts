///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanPerson } from '../../entities';

export const createPerson = async (PersonData: Entities.Persons.PersonData) => {


  const newPerson = new VolovanPerson(PersonData);
  const allPersons = await dep.volovanDb.findByQuery({ deleted: false }, 'persons') as Entities.Persons.PersonData[];
  const personFound = allPersons.filter(person => ((dep.Names.compareSimilarity(person.firstNames, newPerson.firstNames) + dep.Names.compareSimilarity(person.lastNames, newPerson.lastNames)) / 2) > 0.9);

  if (personFound.length > 0)
    throw new Error('A Person with the same name is already registered.')


  return await dep.volovanDb.insertOne(newPerson.getData(), 'persons') as Entities.Persons.PersonData[]



}