///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Delete Events Use Case');

export const deleteEvent = async (entityData: Entities.Events.EventData) => {

  if (!entityData.id) throw new Error('You must enter the event id to complete the operation');
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'events') as Entities.Events.EventData[];


  if (entityFound.length === 0)
    throw new Error('The event id provided was not found in the database.')

  const data = entityFound[0];
  data.deleted = true;

  const deleted = await dep.volovanDb.updateOne({ id: data.id, ...data }, 'events') as Entities.Events.EventData[];

  return deleted;

}