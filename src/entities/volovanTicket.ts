///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan Role Entty');


export class VolovanTicket {

  id: string;
  event: string;
  person: string;
  code: string;
  dateTimes: number[];

  active: boolean;
  isInEvent: boolean;
  secret: string;
  scans: Entities.Tickets.ScanData[]
  url: string;
  secure_url: string;

  createdOn: number;
  createdBy: string;
  modifiedOn: number;
  modifiedBy: string;
  deleted: boolean;


  constructor({
    id = dep.Id.makeId(),
    event,
    person,
    code,
    dateTimes,
    active = true,
    isInEvent = false,
    secret = dep.Passwords.generateRandoString(),
    scans,
    url,
    secure_url,



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
    this.code = code;
    this.dateTimes = dateTimes;
    this.active = active;
    this.isInEvent = isInEvent;
    this.scans = scans;
    this.secret = secret;
    this.url = url;
    this.secure_url = secure_url;

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
      code: this.code,
      dateTimes: this.dateTimes,
      active: this.active,
      isInEvent: this.isInEvent,
      scans: this.scans,
      secret: this.secret,
      url: this.url,

      secure_url: this.secure_url,

      createdOn: this.createdOn,
      createdBy: this.createdBy,
      modifiedOn: this.modifiedOn,
      modifiedBy: this.modifiedBy,
      deleted: this.deleted
    }
  }
}