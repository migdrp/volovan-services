import { volovanDb } from '../../adapters';
import { findOrder } from './findOrder';
import { createOrder } from './createOrder';
import { editeOrder } from './editOrder';
import { createSinglePersonOrder } from './createSinglePersonOrder';



export const dep = {
  volovanDb
}


export {
  findOrder,
  createOrder,
  editeOrder, createSinglePersonOrder
}