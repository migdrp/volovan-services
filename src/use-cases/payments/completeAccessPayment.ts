///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger, sendTicketsEmail } from '../../utils';
import { createManyTickets } from '../tickets';

const log = new Logger('Complete Access Payments Use Case');

export const completeAccessPayment = async (data: Payments.StripeCompletePaymentData) => {


  log.debug('Buy Event Data: ', data);


  if (!data.volovanOrderData)
    throw Error('Se debe ingrear la información de la orden de compra');

  const eventFound = await dep.volovanDb.findByQuery({ id: data.volovanOrderData.event, deleted: false }, 'events') as Entities.Events.EventData[];
  if (eventFound.length === 0)
    throw Error('El evento ingresado para la compra no existe.');


  const orderWithCharge = data.volovanOrderData;
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