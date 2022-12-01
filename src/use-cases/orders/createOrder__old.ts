///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanOrder } from '../../entities';
import { Logger } from '../../utils';


const log = new Logger('Create Order Use Case');

/**
 * @description  Crea un objeto de volovan Order relacionado con una orden de compra del provedor de identidad, un evento, tickets y personas.
 *    1 - Persons previamente creadas
 *    2 - Revisa si existe el evento
 *    3 - Revisa si el customer ya tiene una orden de compra pagada a su email y nombre.
 *    4 - Revisa si ya existe una orden que conetnga alguna de las personas ingresadas.
 *    
 */
export const createOrder = async (OrderData: Entities.Orders.OrderData) => {


  const newOrder = new VolovanOrder(OrderData);
  let existingOrdersToDelete: Entities.Orders.OrderData[] = [];

  log.debug('Persons found: ', newOrder.persons);

  const personsExist = await dep.volovanDb.findByQuery({ id: { $in: newOrder.persons }, deleted: false }, 'persons');

  log.debug('Persons found: ', personsExist);

  if (personsExist.length !== newOrder.persons.length)
    throw new Error('Algunos identificadores de las personas ingresadas en la orden de compra no se encontraron en el sistema.');

  const eventsFound = await dep.volovanDb.findByQuery({ id: newOrder.event, deleted: false }, 'events') as Entities.Events.EventData[];
  log.debug('Events found: ', eventsFound);

  if (eventsFound.length === 0)
    throw new Error('El identificador del evento ingresado no existe en la base de datos.');

  // Revisa si existe una orden de compra del mismo customer con aguna de las personas ingresadas.
  const sameCustomerOrderWithPersonsFound = await dep.volovanDb.findByQuery({ persons: { $all: newOrder.persons }, event: newOrder.event, deleted: false, customerEmail: newOrder.customerEmail }, 'orders') as Entities.Orders.OrderData[];

  if (sameCustomerOrderWithPersonsFound.length === 0) { // No se encontraron ordenes de compra de el "customer" ingresado.

    const orderWithPersonsFound = await dep.volovanDb.findByQuery({ persons: { $all: newOrder.persons }, event: newOrder.event, deleted: false }, 'orders') as Entities.Orders.OrderData[];

    if (orderWithPersonsFound.length === 1) {
      if (orderWithPersonsFound[0].status === 'paid') { // --------------------------    (RETURNS)
        log.debug('Paid order with some persons found:');
        const personsInOrder = await dep.volovanDb.findManyWithIdsAray(orderWithPersonsFound[0].persons, 'persons') as Entities.Persons.PersonData[];
        const personsInOrderFiltered = personsInOrder.filter(person => newOrder.persons.includes(person.id));
        const personsNames = personsInOrderFiltered.map(person => `${person.firstNames} ${person.lastNames}`);
        throw new Error(`${personsNames.join(', ')} ${personsNames.length > 1 ? 'ya han sido registrados en una orden de compra de accesos para el mismo evento.' : 'ya ha sido registrado en una orden de compra de accesos para el mismo evento.'}`);

      }

      if (orderWithPersonsFound[0].status === 'standby') {  // --------------------------    (RSUMES)

        let existingOrder = orderWithPersonsFound[0];
        existingOrdersToDelete.push(existingOrder);

      }
    }

    if (orderWithPersonsFound.length > 1) { // --------------------------  Esto no deberia suceder en teoria...  (RETURNS)
      log.error('ESTO NO DEBERIA SUCEDER... SE ENCONTRARON ORDENES DE COMPRA CON LAS MISMAS PERSONAS INCLUIDAS, si ninguna está pagada no pasa nada...')
      for (let i = 0; i < orderWithPersonsFound.length; i++) {
        if (orderWithPersonsFound[i].status === 'paid') {  // Se encontro una orden pagada con personas similares -------- (RETURNS)
          log.debug('Paid order with some persons found:');
          const personsInOrder = await dep.volovanDb.findManyWithIdsAray(orderWithPersonsFound[i].persons, 'persons') as Entities.Persons.PersonData[];
          const personsInOrderFiltered = personsInOrder.filter(person => newOrder.persons.includes(person.id));
          const personsNames = personsInOrderFiltered.map(person => `${person.firstNames} ${person.lastNames}`);
          throw new Error(`${personsNames.join(', ')} ${personsNames.length > 1 ? 'ya han sido registrados en una orden de compra de accesos para el mismo evento.' : 'ya ha sido registrado en una orden de compra de accesos para el mismo evento.'}`);
        }
      }
    }

  } else {   //Ya existe una orden de compra del mismo "customer" ingresado para una o mas personas de las ya ingresadas.

    if (sameCustomerOrderWithPersonsFound.length === 1) { // Existe solo una orden de compra al mismo "customer".

      const existingOrder = sameCustomerOrderWithPersonsFound[0];

      if (existingOrder.status === 'standby') { // La orden está en stanbdBy, resumiendo opraciones...     (RESUMES)

        existingOrdersToDelete.push(existingOrder);

      }

      if (existingOrder.status === 'paid') { // La orden ingresada ya etsaba pagada, imprimiendo personsas que estaban incluidas. (RETURNS)


        log.debug('Paid order with some persons found:');
        const personsInOrder = await dep.volovanDb.findManyWithIdsAray(existingOrder.persons, 'persons') as Entities.Persons.PersonData[];
        const personsInOrderFiltered = personsInOrder.filter(person => newOrder.persons.includes(person.id));
        const personsNames = personsInOrderFiltered.map(person => `${person.firstNames} ${person.lastNames}`);
        throw new Error(`${personsNames.join(', ')} ${personsNames.length > 1 ? 'ya han sido registrados en una orden de compra de accesos del evento seleccionado.' : 'ya ha sido registrado en una orden de compra de accesos para el mismo evento.'}`);

      }

    } else if (sameCustomerOrderWithPersonsFound.length > 1) {

      log.error('ESTO NO DEBERIA SUCEDER... SE ENCONTRARON ORDENES DE COMPRA CON LAS MISMAS PERSONAS INCLUIDAS PARA EL MISMO CUSTOMER, si ninguna está pagada elimina las existentes y resume con la nueva información, si alguna ya está pagada marca error...')
      for (let i = 0; i < sameCustomerOrderWithPersonsFound.length; i++) {
        for (let i = 0; i < sameCustomerOrderWithPersonsFound.length; i++) {
          if (sameCustomerOrderWithPersonsFound[i].status === 'paid') {  // Se encontro una orden pagada con personas similares -------- (RETURNS)
            log.debug('Paid order with some persons found:');
            const personsInOrder = await dep.volovanDb.findManyWithIdsAray(sameCustomerOrderWithPersonsFound[i].persons, 'persons') as Entities.Persons.PersonData[];
            const personsInOrderFiltered = personsInOrder.filter(person => newOrder.persons.includes(person.id));
            const personsNames = personsInOrderFiltered.map(person => `${person.firstNames} ${person.lastNames}`);
            throw new Error(`${personsNames.join(', ')} ${personsNames.length > 1 ? 'ya han sido registrados en una orden de compra de accesos para el mismo evento.' : 'ya ha sido registrado en una orden de compra de accesos para el mismo evento.'}`);
          }
          if (sameCustomerOrderWithPersonsFound[i].status === 'standby') {  // Se encontraron ordenes de compra en standby para el mismo customer, eliminando ordenes en standby -------- (RESUMES)
            existingOrdersToDelete.push(sameCustomerOrderWithPersonsFound[i])
          }
        }
      }

    }
  }


  if (existingOrdersToDelete.length > 0) {
    const changes = existingOrdersToDelete.map(order => {
      order.deleted = true;
      return order;
    })
    await dep.volovanDb.updateMany(changes, 'orders');
  }

  //calcula el precio de la orden de compra del lado del servidor..
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
    newOrder.notes.push('Orden creada desde los servicios de Volovan Productions. ')

  return await dep.volovanDb.insertOne(newOrder.getData(), 'orders') as Entities.Orders.OrderData[]

}