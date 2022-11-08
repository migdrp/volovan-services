import { volovanDb } from '../../adapters';
import { createEvent } from './createEvent';
import { deleteEvent } from './deleteEvent';
import { findEvent } from './findEvent';
import { editeEvent } from './editEvent';



export const dep = {
  volovanDb
}


export {
  createEvent,
  deleteEvent,
  editeEvent,
  findEvent
}