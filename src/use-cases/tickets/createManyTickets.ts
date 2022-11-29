///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanTicket } from '../../entities';
import { Logger } from '../../utils';
import { ImageManager } from '../../utils/ImageManager';


const log = new Logger('Create Many Tickets Use Case');

export const createManyTickets = async (ticketData: Entities.Tickets.TicketData[]) => {

  let newTickets: Entities.Tickets.TicketData[] = [];
  let personsIds: string[] = [];
  let eventsId: string = '';
  let ticketsIds: string[] = [];

  for (let i = 0; i < ticketData.length; i++) {
    const currentTicket = ticketData[i]
    const newTicket = new VolovanTicket(currentTicket);

    if (i === 0) {
      eventsId = newTicket.getData().event;
    } else if (i > 0) {
      if (newTicket.event !== eventsId)
        throw new Error('Solo puedes crear múltiples accesos que pertenezcan al mismo evento.')
    }

    if (!personsIds.includes(newTicket.person))
      personsIds.push(newTicket.person)
    else
      throw new Error('No pueden existir dos accesos para la misma persona.')

    newTickets.push(newTicket.getData());
    ticketsIds.push(newTicket.id);
  }

  const eventFound = await dep.volovanDb.findByQuery({ id: eventsId, deleted: false }, 'events') as Entities.Events.EventData[];

  if (eventFound.length === 0)
    throw new Error('El identificador del evento ingresado no existe en el sistema.')


  const personFound = await dep.volovanDb.findByQuery({ id: { $in: personsIds }, deleted: false }, 'persons') as Entities.Persons.PersonData[];
  if (personFound.length !== personsIds.length)
    throw new Error('Los identificadores de algunas personas ingresadas no fueron encontrados en el sistema.')

  const eventData = eventFound[0]


  const ticketsAlradyExist = await dep.volovanDb.findByQuery({ person: { $in: personsIds }, event: eventData.id, deleted: false }, 'tickets') as Entities.Tickets.TicketData[];

  if (ticketsAlradyExist.length > 0) {
    const ticketsAlradyExistPersonsIds = ticketsAlradyExist.map(ticket => ticket.person);
    newTickets = newTickets.filter(ticket => !ticketsAlradyExistPersonsIds.includes(ticket.person));
  }


  let response = [];
  let insertedNewTickets: Entities.Tickets.TicketData[] = []

  if (newTickets.length > 0) {
    /** Changes in event */
    for (let x = 0; x < newTickets.length; x++) {
      const newTicket = newTickets[x];
      if (!newTicket.dateTimes) newTicket.dateTimes = eventData.dateTimes;
      if (!newTicket.scans) newTicket.scans = [];
      if (!eventData.tickets) {
        eventData.tickets = [];
        eventData.tickets.push(newTicket.id)
      } else {
        if (!eventData.tickets.includes(newTicket.id))
          eventData.tickets.push(newTicket.id)
      }

      const ticketImageData = await ImageManager.uploadQrTicketImage(eventData.name, newTicket.id);
      newTickets[x].url = ticketImageData.url
      newTickets[x].secure_url = ticketImageData.secure_url
    }


    await dep.volovanDb.updateOne({ id: eventData.id, ...eventData }, 'events');

    insertedNewTickets = await dep.volovanDb.insertMany(newTickets, 'tickets') as Entities.Tickets.TicketData[];
  }

  response = [...insertedNewTickets, ...ticketsAlradyExist]

  return response




}