import { volovanDb } from '../../adapters';
import { findOrder } from './findOrder';
import { createOrder } from './createOrder';
import { editeOrder } from './editOrder';



export const dep = {
  volovanDb
}


export {
  findOrder,
  createOrder,
  editeOrder
}