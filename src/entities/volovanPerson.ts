///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan Role Entty');


export class VolovanPerson {

  id: string;
  firstNames: string;
  lastNames: string;
  phone: string;
  email: string;
  address: string;

  createdOn: number;
  createdBy: string;
  modifiedOn: number;
  modifiedBy: string;
  deleted: boolean;


  constructor({
    id = dep.Id.makeId(),
    firstNames,
    lastNames,
    phone,
    email,
    address,


    createdOn = Date.now(),
    createdBy,
    modifiedOn = Date.now(),
    modifiedBy,
    deleted = false
  }: Entities.Persons.PersonData) {

    if (!dep.Id.isValidId(id))
      throw new Error('Person must have a valid id.')
    if (!firstNames)
      throw new Error('First names are required.')
    if (!lastNames)
      throw new Error('Last names are required.')
    if (!email)
      throw new Error('Email is required.')


    this.id = id;
    this.firstNames = firstNames;
    this.lastNames = lastNames;
    this.phone = phone;
    this.email = email;
    this.address = address;

    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.modifiedOn = modifiedOn;
    this.modifiedBy = modifiedBy;
    this.deleted = deleted;

  }

  getData = () => {
    return {
      id: this.id,
      firstNames: this.firstNames,
      lastNames: this.lastNames,
      phone: this.phone,
      email: this.email,
      address: this.address,

      createdOn: this.createdOn,
      createdBy: this.createdBy,
      modifiedOn: this.modifiedOn,
      modifiedBy: this.modifiedBy,
      deleted: this.deleted
    }
  }
}