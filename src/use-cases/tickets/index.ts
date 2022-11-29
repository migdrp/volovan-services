import { volovanDb } from '../../adapters';
import { createTicket } from './createTicket';
import { deleteTicket } from './deleteTicket';
import { findTicket } from './findTicket';
import { editeTicket } from './editTicket';
import { createManyTickets } from './createManyTickets';
import { ImageManager } from '../../utils';



export const dep = {
  volovanDb,
  ImageManager
}


export {
  createManyTickets,
  createTicket,
  deleteTicket,
  editeTicket,
  findTicket
}