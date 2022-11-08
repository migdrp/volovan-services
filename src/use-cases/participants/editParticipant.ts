///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanParticipant } from '../../entities';

export const editeParticipant = async (entityData: Entities.Participants.ParticipantData) => {



  if (!entityData.id) throw new Error('Id attribute must be provided');
  if (entityData.deleted) delete entityData.deleted;
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'participants') as Entities.Participants.ParticipantData[];
  if (entityFound.length === 0) throw new Error('The participant with the id provided do not exist on the database.');
  const modifiedData = { ...entityFound[0], ...entityData };
  const newEntity = new VolovanParticipant(modifiedData);

  return await dep.volovanDb.updateOne(newEntity.getData(), 'participants') as Entities.Participants.ParticipantData[]

}