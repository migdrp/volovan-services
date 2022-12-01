///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanOrder } from '../../entities';

export const editeOrder = async (entityData: Entities.Orders.OrderData) => {



  if (!entityData.id) throw new Error('Id attribute must be provided');
  //if (entityData.deleted) delete entityData.deleted;
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'orders') as Entities.Orders.OrderData[];
  if (entityFound.length === 0) throw new Error('The order with the id provided do not exist on the database.');
  const modifiedData = { ...entityFound[0], ...entityData };
  const newEntity = new VolovanOrder(modifiedData);

  return await dep.volovanDb.updateOne(newEntity.getData(), 'orders') as Entities.Orders.OrderData[]

}