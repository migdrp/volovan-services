///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanPerson } from '../../entities';
import { Logger } from '../../utils';


const log = new Logger('Create Many Persons Use Case');

export const createManyPersons = async (personData: Entities.Persons.PersonData[]) => {

  const newPersons: Entities.Persons.PersonData[] = [];
  const personsIds: string[] = [];

  for (let i = 0; i < personData.length; i++) {
    const currentPerson = personData[i]
    const newPerson = new VolovanPerson(currentPerson);

    newPersons.push(newPerson.getData());
    personsIds.push(newPerson.id);

  }

  /**
   * @todo: Cambiar cuando ya exista muchas personas 
   */
  const allPersons = await dep.volovanDb.findByQuery({ deleted: false }, 'persons') as Entities.Persons.PersonData[];
  const newPersonsThatNotExistInDb: Entities.Persons.PersonData[] = [];
  let personsThatExistInDb: Entities.Persons.PersonData[] = [];

  for (let i = 0; i < newPersons.length; i++) {
    const currentNewPerson = newPersons[i];
    const similarPersonFound = allPersons.filter(person => ((dep.Names.compareSimilarity(person.firstNames, currentNewPerson.firstNames) + dep.Names.compareSimilarity(person.lastNames, currentNewPerson.lastNames)) / 2) > 0.9);

    if (similarPersonFound.length === 0) {
      newPersonsThatNotExistInDb.push(currentNewPerson)
    } else if (similarPersonFound.length > 0) {
      personsThatExistInDb.push(similarPersonFound[0])
    }
  }
  let response = [];
  if (newPersonsThatNotExistInDb.length > 0)
    response = await dep.volovanDb.insertMany(newPersonsThatNotExistInDb, 'persons') as Entities.Persons.PersonData[];

  response = [...personsThatExistInDb, ...response]

  return response as Entities.Persons.PersonData[];

}
