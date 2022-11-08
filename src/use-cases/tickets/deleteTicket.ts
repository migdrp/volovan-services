///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Delete Tickets Use Case');

export const deleteTicket = async (entityData: Entities.Tickets.TicketData) => {

  if (!entityData.id) throw new Error('You must enter the ticket id to complete the operation');
  const ticketFound = await dep.volovanDb.findById({ id: entityData.id }, 'tickets') as Entities.Tickets.TicketData[];

  if (ticketFound.length === 0)
    throw new Error('The ticket id provided was not found in the database.');


  const eventFound = await dep.volovanDb.findByQuery({ id: ticketFound[0].event, deleted: false }, 'events') as Entities.Events.EventData[];
  log.debug('Events found: ', eventFound);

  if (eventFound.length > 0) {
    log.debug('Remnoving ticket from event... ', eventFound);
    const event = eventFound[0];
    event.tickets = event.tickets.filter(ticket => ticket !== ticketFound[0].id);
    log.debug('Remnoving ticket from event... ', event);
    const modifiedEvent = await dep.volovanDb.updateOne({ id: event.id, ...event }, 'events');
    log.debug('modifiedEvent: ', modifiedEvent);
  }



  const data = ticketFound[0];
  data.deleted = true;

  const deleted = await dep.volovanDb.updateOne({ id: data.id, ...data }, 'tickets') as Entities.Tickets.TicketData[];

  return deleted;

}