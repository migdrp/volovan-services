///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanOrder } from '../../entities';
import { createPerson } from '../persons';
import { Logger } from '../../utils';


const log = new Logger('Create Single Person Order Use Case');

/**
 * @description  Crea un objeto de volovan Order relacionado con una orden de compra del provedor de identidad, un evento, tickets y personas.
 *    1 - Persons previamente creadas
 *    2 - Revisa si existe el evento
 *    3 - Revisa si alguna persona ingresada ya está en los datos de una orden de compra pagada.
 *    4 - Revisa si el comprador ya tiene alguna orden de compra en standBy
 *    
 */
export const createSinglePersonOrder = async (OrderData: Entities.Orders.OrderData) => {


  const newOrder = new VolovanOrder(OrderData);

  log.debug('New Order Persons found: ', newOrder.persons.length);



  /* __________________________________________________________________________________________________________________________
          2  Revisa si el evento existe en el sistema
  */
  const eventsFound = await dep.volovanDb.findByQuery({ id: newOrder.event, deleted: false }, 'events') as Entities.Events.EventData[];
  log.debug('New Order Events found: ', eventsFound.length);
  if (eventsFound.length === 0)
    throw new Error('El identificador del evento ingresado no existe en la base de datos.');
  /* ______________________________________________________________________________________________________________________________ */



  /* __________________________________________________________________________________________________________________________
          3  Revisa si alguna persona ingresada ya se encuentra en una orden de compra pagada para el mismo evento.
   */
  const orderPaidWithSamePersons = await dep.volovanDb.findByQuery({ persons: { $all: newOrder.persons }, event: newOrder.event, deleted: false, status: 'paid' }, 'orders') as Entities.Orders.OrderData[];
  log.debug('Orders Paid With Same Persons: ', orderPaidWithSamePersons.length);
  if (orderPaidWithSamePersons.length > 0) {
    const allPersonsInOrders = [];
    for (let x = 0; x < orderPaidWithSamePersons.length; x++) {
      for (let y = 0; y < orderPaidWithSamePersons[x].persons.length; y++) {
        if (!allPersonsInOrders.includes(orderPaidWithSamePersons[x].persons[y]))
          allPersonsInOrders.push(orderPaidWithSamePersons[x].persons[y]);
      }
    }

    const personsInOrder = await dep.volovanDb.findManyWithIdsAray(allPersonsInOrders, 'persons') as Entities.Persons.PersonData[];
    const personsInOrderFiltered = personsInOrder.filter(person => newOrder.persons.includes(person.id));
    const personsNames = personsInOrderFiltered.map(person => `${person.firstNames} ${person.lastNames}`);
    throw new Error(`${personsNames.join(', ')} ${personsNames.length > 1 ? 'ya han sido registrados en una orden de compra de accesos del evento seleccionado.' : 'ya ha sido registrado en una orden de compra de accesos para el mismo evento.'}`);
  }


  /* ______________________________________________________________________________________________________________________________ */



  /* __________________________________________________________________________________________________________________________
          4  Revisa si el comprador tiene alguna orden de compra en standBy
   */
  const customerOrderFound = await dep.volovanDb.findByQuery({ customerEmail: newOrder.customerEmail, event: newOrder.event, deleted: false, status: 'standby' }, 'orders') as Entities.Orders.OrderData[];
  log.debug('Customer order found in standby: ', customerOrderFound.length);

  let selectedOrder: Entities.Orders.OrderData = null;
  let existingOrdersToDelete: Entities.Orders.OrderData[] = [];

  if (customerOrderFound.length === 1)
    selectedOrder = customerOrderFound[0];
  if (customerOrderFound.length > 1) {
    for (let x = 0; x < customerOrderFound.length; x++) {
      if (x > 0)
        existingOrdersToDelete.push(customerOrderFound[x])
    }
    selectedOrder = customerOrderFound[0];
  }

  if (existingOrdersToDelete.length > 0) {
    const changes = existingOrdersToDelete.map(order => { order.deleted = true; return order; });
    await dep.volovanDb.updateMany(changes, 'orders');
  }

  /**
   * Calcula el precio de la orden de compra del lado del servidor..
   */
  const eventData = eventsFound[0];
  if (eventData.prices.length === 0)
    throw new Error('El evento seleccionado para la compra de accesos aún no tiene sus precios de acceso establecidos...');


  let selectedPrice: Entities.Events.Price = null;
  let validCode = false;
  let totalPrice: Entities.Events.Price = null;

  if (newOrder.eventCode) {

    const participants = await dep.volovanDb.findByQuery({ id: { $in: eventData.participants }, deleted: false }, 'participants') as Entities.Participants.ParticipantData[];
    const participantsCodes = participants.map(participant => participant.name.toLowerCase().replace(/\s/g, ""));
    if (participantsCodes.includes(newOrder.eventCode)) {
      validCode = true;
    }
  }

  if (validCode) selectedPrice = eventData.prices.filter((price) => price.name === "Código")[0];
  else selectedPrice = eventData.prices.filter((price) => price.name === "Normal")[0];

  totalPrice = { ...selectedPrice };
  totalPrice.ammount = newOrder.persons.length * selectedPrice.ammount;

  newOrder.serverAmmount = totalPrice.ammount;
  newOrder.currency = totalPrice.currency;

  if (newOrder.notes)
    newOrder.notes.push('Orden creada de forma manual desde los servicios de Volovan Productions. ');

  if (selectedOrder) {


    selectedOrder.persons = newOrder.persons;
    selectedOrder.serverAmmount = newOrder.serverAmmount;
    selectedOrder.currency = newOrder.currency;
    selectedOrder.clientAmmount = newOrder.clientAmmount
    selectedOrder.customerFirstNames = newOrder.customerFirstNames;
    selectedOrder.customerLastNames = newOrder.customerLastNames;
    selectedOrder.eventCode = newOrder.eventCode;
    selectedOrder.description = newOrder.description;
    selectedOrder.notes.push('Orden creada con anterioridad, continuando con el proceso de pago de forma física. (pago en efectivo)')
    log.debug('Customer standby selected order data to modify.. ', selectedOrder);
    const response = await dep.volovanDb.updateOne({ id: selectedOrder.id, ...selectedOrder }, 'orders') as Entities.Orders.OrderData[]
    log.debug('Customer standby selected order to resume process.. ', response);
    return response;
  } else {
    const response = await dep.volovanDb.insertOne(newOrder.getData(), 'orders') as Entities.Orders.OrderData[]
    log.debug('Customer brand new order... ', response);
    return response;
  }
}