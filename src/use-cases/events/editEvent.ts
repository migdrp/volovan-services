///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanEvent } from '../../entities';

export const editeEvent = async (entityData: Entities.Events.EventData) => {



  if (!entityData.id) throw new Error('Id attribute must be provided');
  if (entityData.deleted) delete entityData.deleted;
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'events') as Entities.Events.EventData[];

  if (entityFound.length === 0) throw new Error('The event with the id provided do not exist on the database.');


  if (entityData.tickets) entityData.tickets = entityFound[0].tickets;

  const modifiedData = { ...entityFound[0], ...entityData };
  const newEntity = new VolovanEvent(modifiedData);

  const newEventData = newEntity.getData();

  if (newEventData.participants && newEventData.participants.length > 0) {

    const participantsFound = await dep.volovanDb.findManyWithIdsAray(newEventData.participants, 'participants');
    if (participantsFound.length !== newEventData.participants.length)
      throw new Error('Some of the participants were not found in the database.')

  }

  return await dep.volovanDb.updateOne(newEntity.getData(), 'events') as Entities.Events.EventData[]

}