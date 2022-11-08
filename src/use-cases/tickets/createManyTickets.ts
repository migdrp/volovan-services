///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanTicket } from '../../entities';
import { Logger } from '../../utils';


const log = new Logger('Create Many Tickets Use Case');

export const createManyTickets = async (ticketData: Entities.Tickets.TicketData[]) => {

  const newTickets: Entities.Tickets.TicketData[] = [];
  let personsIds: string[] = [];
  let eventsId: string = '';
  let ticketsIds: string[] = [];

  for (let i = 0; i < ticketData.length; i++) {
    const currentTicket = ticketData[i]
    const newTicket = new VolovanTicket(currentTicket);

    if (!personsIds.includes(newTicket.person))
      personsIds.push(newTicket.person)

    if (i === 0) {
      eventsId = newTicket.getData().event;
    } else if (i > 0) {

      if (newTicket.event !== eventsId)
        throw new Error('All tickets must have the same event id.')

    }
    newTickets.push(newTicket.getData());
    ticketsIds.push(newTicket.id);
  }

  const eventFound = await dep.volovanDb.findByQuery({ id: eventsId, deleted: false }, 'events');
  if (eventFound.length === 0)
    throw new Error('Event provided not found in the database.')

  const eventData = eventFound[0]

  for (let x = 0; x < newTickets.length; x++) {

    const newTicket = newTickets[x];

    if (!newTicket.dateTimes) newTicket.dateTimes = eventData.dateTimes;
    if (!newTicket.scans) newTicket.scans = [];

    if (!eventData.tickets) {
      eventData.tickets = [];
      eventData.tickets.push(newTicket.id)
    } else {
      eventData.tickets.push(newTicket.id)
    }

  }

  await dep.volovanDb.updateOne({ id: eventData.id, ...eventData }, 'events');

  const personFound = await dep.volovanDb.findManyWithIdsAray(personsIds, 'persons');
  if (personFound.length !== personsIds.length)
    throw new Error('Some persons provided not found in the database.')


  return await dep.volovanDb.insertMany(newTickets, 'tickets') as Entities.Tickets.TicketData[];




}