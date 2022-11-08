///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Find Events Use Case');

export const findEvent = async (entityData: Entities.Events.EventData) => {

  if (!entityData.deleted) entityData.deleted = false;
  const found = await dep.volovanDb.findByQuery({ ...entityData }, 'events') as Entities.Events.EventData[];


  return found;
}