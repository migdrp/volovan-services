///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Find Tickets Use Case');

export const findTicket = async (entityData: Entities.Tickets.TicketData) => {

  if (!entityData.deleted) entityData.deleted = false;
  const found = await dep.volovanDb.findByQuery({ ...entityData }, 'tickets') as Entities.Tickets.TicketData[];


  return found;
}