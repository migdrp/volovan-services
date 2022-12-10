///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger, sendTicketsEmail } from '../../utils';
import { createManyTickets } from '../tickets';
import { createSinglePersonOrder } from '../orders';
import { createPerson } from '../persons';

const log = new Logger('Cash Access Payments Use Case');

export const cashAccessPayment = async (singlePersonOrderData: Entities.Orders.OrderData) => {


  log.debug('Cash Access Payments Data: ', singlePersonOrderData);

  if (!singlePersonOrderData)
    throw Error('Se debe ingrear la información de la orden de compra');

  /* __________________________________________________________________________________________________________________________
         1  Revisa si los ids de personas existen (Las personsas ya deben estar previamente creadas) 
 */
  let personsExist = await dep.volovanDb.findByQuery({ firstNames: singlePersonOrderData.customerFirstNames, lastNames: singlePersonOrderData.customerLastNames, deleted: false }, 'persons');
  if (personsExist.length === 0) {
    const newPerson = await createPerson({ firstNames: singlePersonOrderData.customerFirstNames, lastNames: singlePersonOrderData.customerLastNames });
    personsExist = newPerson;
  }
  /* ______________________________________________________________________________________________________________________________ */



  singlePersonOrderData.persons = [personsExist[0].id];


  const response = await createSinglePersonOrder(singlePersonOrderData);
  let orderData = response[0];
  log.debug('New order: ', orderData)

  if (!orderData)
    throw Error('Error al crear la orden de compra individual.');


  const eventFound = await dep.volovanDb.findByQuery({ id: orderData.event, deleted: false }, 'events') as Entities.Events.EventData[];
  if (eventFound.length === 0)
    throw Error('El evento ingresado para la compra no existe.');


  const orderWithCharge = orderData;
  orderWithCharge.status = 'paid';

  const paidOrder = await dep.volovanDb.updateOne({ id: orderWithCharge.id, ...orderWithCharge }, 'orders') as Entities.Orders.OrderData[];
  log.debug('paidOrder modified....', paidOrder);

  const tickets = await createManyTickets(paidOrder[0].persons.map(person => { return { event: paidOrder[0].event, person: person } })) as Entities.Tickets.TicketData[];
  log.debug('All Tickets', tickets);

  const persons = await dep.volovanDb.findByQuery({ id: { $in: paidOrder[0].persons }, deleted: false }, 'persons');

  const emailSent = await sendTicketsEmail(tickets, eventFound[0], paidOrder[0], persons);

  if (!emailSent)
    throw Error('Ha ocurrido un error al momento de enviar los accesos, por favor contacta al equipo de soporte.');

  return paidOrder;

}