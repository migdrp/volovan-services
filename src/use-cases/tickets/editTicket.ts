///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanTicket } from '../../entities';

export const editeTicket = async (entityData: Entities.Tickets.TicketData) => {



  if (!entityData.id) throw new Error('Id attribute must be provided');
  if (entityData.deleted) delete entityData.deleted;
  if (entityData.person) delete entityData.person;
  if (entityData.event) delete entityData.event;
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'tickets') as Entities.Tickets.TicketData[];
  if (entityFound.length === 0) throw new Error('The ticket with the id provided do not exist on the database.');
  const modifiedData = { ...entityFound[0], ...entityData };
  const newEntity = new VolovanTicket(modifiedData);

  return await dep.volovanDb.updateOne(newEntity.getData(), 'tickets') as Entities.Tickets.TicketData[]

}