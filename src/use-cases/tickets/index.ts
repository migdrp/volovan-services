import { volovanDb } from '../../adapters';
import { createTicket } from './createTicket';
import { deleteTicket } from './deleteTicket';
import { findTicket } from './findTicket';
import { editeTicket } from './editTicket';
import { createManyTickets } from './createManyTickets';



export const dep = {
  volovanDb
}


export {
  createManyTickets,
  createTicket,
  deleteTicket,
  editeTicket,
  findTicket
}