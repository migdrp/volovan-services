///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanEvent } from '../../entities';

export const createEvent = async (eventData: Entities.Events.EventData) => {


  if (eventData.tickets) delete eventData.tickets;
  const newEvent = new VolovanEvent(eventData);
  const eventFound = await dep.volovanDb.findByQuery({ name: newEvent.name, deleted: false }, 'events');

  if (eventFound.length > 0)
    throw new Error('A Event with the same name is already registered.')

  const newEventData = newEvent.getData();

  if (newEventData.participants && newEventData.participants.length > 0) {

    const participantsFound = await dep.volovanDb.findManyWithIdsAray(newEventData.participants, 'participants');
    if (participantsFound.length !== newEventData.participants.length)
      throw new Error('Some of the participants were not found in the database.')

  }


  return await dep.volovanDb.insertOne(newEvent.getData(), 'events') as Entities.Events.EventData[]



}