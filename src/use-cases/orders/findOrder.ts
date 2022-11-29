///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Find Order Use Case');

export const findOrder = async (entityData: Entities.Orders.OrderData) => {

  if (!entityData.deleted) entityData.deleted = false;
  const found = await dep.volovanDb.findByQuery({ deleted: false, ...entityData }, 'orders') as Entities.Orders.OrderData[];

  return found;

}