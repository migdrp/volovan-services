///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan Order Entity');


export class VolovanOrder {

  id: string;
  description: string;
  persons: string[];
  event: string;
  eventCode: string;
  customerFirstNames: string;
  customerLastNames: string;
  customerEmail: string;
  customerPhone: string;
  clientAmmount: number;
  serverAmmount: number;
  currency: string;
  status: string;
  notes: string[];
  paymentOrder: string;
  emailReceived: boolean;
  lastEmailRequested: number;

  createdOn: number;
  createdBy: string;
  modifiedOn: number;
  modifiedBy: string;
  deleted: boolean;


  constructor({
    id = dep.Id.makeId(),
    description = 'Cargo sin descripción',
    persons,
    event,
    eventCode,

    customerFirstNames,
    customerLastNames,
    customerEmail,
    customerPhone,
    clientAmmount,
    serverAmmount,
    currency,
    status = 'standby',
    notes = [],
    paymentOrder,
    emailReceived = false,
    lastEmailRequested,


    createdOn = Date.now(),
    modifiedOn = Date.now(),
    deleted = false
  }: Entities.Orders.OrderData) {

    if (!dep.Id.isValidId(id))
      throw new Error('El identificador de la orden de compra es inválido.')
    if (!event)
      throw new Error('Se debe ingresar el identificador del evento.')
    if (!customerFirstNames)
      throw new Error('Se debe ingresar el nombre del comprador.')
    if (!customerLastNames)
      throw new Error('Se deben ingresar los apellidos del comprador.')
    if (!customerEmail)
      throw new Error('Se debe ingresar el email del comprador.')
    if (!clientAmmount)
      throw new Error('Se debe ingresar una cantidad total.')
    if (!persons)
      throw new Error('Se debe ingresar por lo menos una persona.')
    if (persons.length === 0)
      throw new Error('Se debe ingresar por lo menos una persona.')


    modifiedOn = Date.now()

    this.id = id;
    this.description = description;
    this.persons = persons;
    this.event = event;
    this.eventCode = eventCode;

    this.customerFirstNames = customerFirstNames;
    this.customerLastNames = customerLastNames;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
    this.clientAmmount = clientAmmount;
    this.serverAmmount = serverAmmount;
    this.currency = currency;
    this.status = status;
    this.notes = notes;
    this.paymentOrder = paymentOrder;
    this.emailReceived = emailReceived;
    this.lastEmailRequested = lastEmailRequested;


    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
    this.deleted = deleted;

  }

  getData = () => {
    return {
      id: this.id,
      description: this.description,
      persons: this.persons,
      event: this.event,
      eventCode: this.eventCode,
      paymentOrder: this.paymentOrder,

      customerFirstNames: this.customerFirstNames,
      customerLastNames: this.customerLastNames,
      customerEmail: this.customerEmail,
      customerPhone: this.customerPhone,
      clientAmmount: this.clientAmmount,
      serverAmmount: this.serverAmmount,
      currency: this.currency,
      status: this.status,
      notes: this.notes,
      emaiilReceived: this.emailReceived,
      lastEmailRequested: this.lastEmailRequested,


      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn,
      deleted: this.deleted
    }
  }
}