import { volovanDb } from '../../adapters';
import { createParticipant } from './createParticipant';
import { deleteParticipant } from './deleteParticipant';
import { findParticipant } from './findParticipant';
import { editeParticipant } from './editParticipant';



export const dep = {
  volovanDb
}


export {
  createParticipant,
  deleteParticipant,
  editeParticipant,
  findParticipant
}