///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan Role Entty');


export class VolovanTicket {

  id: string;
  event: string;
  person: string;
  dateTimes: number[];

  active: boolean;
  isInEvent: boolean;
  secret: string;
  scans: Entities.Tickets.ScanData[]

  createdOn: number;
  createdBy: string;
  modifiedOn: number;
  modifiedBy: string;
  deleted: boolean;


  constructor({
    id = dep.Id.makeId(),
    event,
    person,
    dateTimes,
    active = true,
    isInEvent = false,
    secret = dep.Passwords.generateRandoString(),
    scans,



    createdOn = Date.now(),
    createdBy,
    modifiedOn = Date.now(),
    modifiedBy,
    deleted = false
  }: Entities.Tickets.TicketData) {

    if (!dep.Id.isValidId(id))
      throw new Error('Ticket must have a valid id.')
    if (!event)
      throw new Error('Ticket must have a event.')
    if (!dep.Id.isValidId(event))
      throw new Error('Ticket must have a valid event id.')
    if (!person)
      throw new Error('Ticket must have a person.')
    if (!dep.Id.isValidId(person))
      throw new Error('Ticket must have a valid person id.')

    this.id = id;
    this.event = event;
    this.person = person;
    this.dateTimes = dateTimes;
    this.active = active;
    this.isInEvent = isInEvent;
    this.scans = scans;
    this.secret = secret;

    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.modifiedOn = modifiedOn;
    this.modifiedBy = modifiedBy;
    this.deleted = deleted;

  }

  getData = () => {
    return {
      id: this.id,
      event: this.event,
      person: this.person,
      dateTimes: this.dateTimes,
      active: this.active,
      isInEvent: this.isInEvent,
      scans: this.scans,
      secret: this.secret,


      createdOn: this.createdOn,
      createdBy: this.createdBy,
      modifiedOn: this.modifiedOn,
      modifiedBy: this.modifiedBy,
      deleted: this.deleted
    }
  }
}