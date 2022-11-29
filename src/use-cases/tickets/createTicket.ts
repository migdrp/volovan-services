///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanTicket } from '../../entities';
import { Logger } from '../../utils';

const log = new Logger('Create Ticket Use Case');

export const createTicket = async (ticketData: Entities.Tickets.TicketData) => {


  const newTicket = new VolovanTicket(ticketData);

  const personFound = await dep.volovanDb.findByQuery({ id: newTicket.person, deleted: false }, 'persons') as Entities.Persons.PersonData[];
  log.debug('personFound: ', personFound)
  if (personFound.length === 0)
    throw new Error('Person provided not found in the database.')


  const eventsFound = await dep.volovanDb.findByQuery({ id: newTicket.event, deleted: false }, 'events') as Entities.Events.EventData[];
  log.debug('Events found: ', eventsFound)
  if (eventsFound.length === 0)
    throw new Error('Event provided not found in the database.')




  const eventData = eventsFound[0]



  const ticketForPersonExists = await dep.volovanDb.findByQuery({ person: newTicket.person, event: eventData.id, deleted: false }, 'tickets') as Entities.Tickets.TicketData[];

  if (ticketForPersonExists.length > 0) {
    return ticketForPersonExists[0];
  } else {


    if (!eventData.tickets) {
      eventData.tickets = [];
      eventData.tickets.push(newTicket.id)
    } else if (!eventData.tickets.includes(newTicket.id)) {
      eventData.tickets.push(newTicket.id)
    }

    if (!newTicket.dateTimes) newTicket.dateTimes = eventData.dateTimes;
    if (!newTicket.scans) newTicket.scans = [];



    await dep.volovanDb.updateOne({ id: eventData.id, ...eventData }, 'events');

    return await dep.volovanDb.insertOne(newTicket.getData(), 'tickets') as Entities.Tickets.TicketData[]
  }
}