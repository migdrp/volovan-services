///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Find Participants Use Case');

export const findParticipant = async (entityData: Entities.Participants.ParticipantData) => {

  if (!entityData.deleted) entityData.deleted = false;
  const found = await dep.volovanDb.findByQuery({ ...entityData }, 'participants') as Entities.Participants.ParticipantData[];


  return found;
}