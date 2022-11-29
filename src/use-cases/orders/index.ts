import { volovanDb } from '../../adapters';
import { findOrder } from './findOrder';
import { createOrder } from './createOrder';



export const dep = {
  volovanDb
}


export {
  findOrder,
  createOrder
}