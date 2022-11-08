///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanParticipant } from '../../entities';

export const createParticipant = async (ParticipantData: Entities.Participants.ParticipantData) => {


  const newParticipant = new VolovanParticipant(ParticipantData);
  const participantFound = await dep.volovanDb.findByQuery({ name: newParticipant.name, deleted: false }, 'participants');

  if (participantFound.length > 0)
    throw new Error('A Participant with the same name is already registered.')


  return await dep.volovanDb.insertOne(newParticipant.getData(), 'participants') as Entities.Participants.ParticipantData[]



}