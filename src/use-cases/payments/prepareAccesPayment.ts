///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger, StripePayments } from '../../utils';
import { createOrder } from '../orders';
import { createManyPersons } from '../persons';


const log = new Logger('Pramer Access Payment Use Case');

export const prepareAccesPayment = async (data: Payments.StripePreparePaymentData) => {


  log.debug('Buy Event Data: ', data);

  if (!data.personsData)
    throw Error('Se debe ingresar la información de las personas a las que pertenecen los accesos.');

  if (!data.volovanOrderData)
    throw Error('Se debe ingrear la información de la orden de compra');

  const eventFound = await dep.volovanDb.findByQuery({ id: data.volovanOrderData.event, deleted: false }, 'events') as Entities.Events.EventData[];


  if (eventFound.length === 0)
    throw Error('El evento ingresado para la compra no existe.');

  const persons = await createManyPersons(data.personsData);
  log.debug('Persons created: ', persons);

  data.volovanOrderData.persons = persons.map(person => person.id);
  log.debug('Persons for order: ', data.volovanOrderData.persons);

  const newOrder = await createOrder(data.volovanOrderData);
  log.debug('Order Created: ', newOrder[0]);

  if (newOrder.length === 0)
    throw Error('Ocurrió un error durante la cración de la orden de compra.');


  let createdOrder = { id: newOrder[0]['_id'], ...newOrder[0] }
  delete createOrder['_id'];
  log.debug('createdOrder: ', createdOrder);

  const stripeResponse = await StripePayments.findCustomerByNameAndEmail(`${createdOrder.customerFirstNames} ${createdOrder.customerLastNames}`, createdOrder.customerEmail)
  let stripeCustomer = null;

  if (stripeResponse.data.length > 0) {
    stripeCustomer = stripeResponse.data[0];
  } else {

    stripeCustomer = await StripePayments.createCustomer({
      name: `${createdOrder.customerFirstNames} ${createdOrder.customerLastNames}`,
      email: createdOrder.customerEmail
    });
  }



  let intent = await StripePayments.createPaymentIntent({
    amount: createdOrder.serverAmmount * 100,
    currency: createdOrder.currency,
    payment_method_types: ['card'],
    customer: stripeCustomer.id,
  });

  createdOrder.paymentOrder = intent.id


  const lastModToOrder = await dep.volovanDb.updateOne({ id: createdOrder.id, ...createdOrder }, 'orders') as Entities.Orders.OrderData[];

  if (lastModToOrder.length === 0) {
    intent = await StripePayments.cancelPaymentIntent(intent.id);
    throw new Error('Algo salió mal al crear la orden de compra. Cancelando requerimiento de pago.')
  }

  log.debug('The las modifiation to order before step3 (step3 = coplete access payements). ', lastModToOrder[0])

  return { paymentIntent: intent, createdOrder: lastModToOrder[0] } as Payments.StripePreparePaymentResponse;
}