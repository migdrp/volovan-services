///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Delete Participants Use Case');

export const deleteParticipant = async (entityData: Entities.Participants.ParticipantData) => {

  if (!entityData.id) throw new Error('You must enter the participant id to complete the operation');
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'participants') as Entities.Participants.ParticipantData[];


  if (entityFound.length === 0)
    throw new Error('The participant id provided was not found in the database.')

  const data = entityFound[0];
  data.deleted = true;

  const deleted = await dep.volovanDb.updateOne({ id: data.id, ...data }, 'participants') as Entities.Participants.ParticipantData[];

  return deleted;

}