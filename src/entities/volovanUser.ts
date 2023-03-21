///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan User Entty');


export class VolovanUser {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: string[] = [];
  organization: string;


  createdOn: number;
  createdBy: string;
  modifiedOn: number;
  modifiedBy: string;
  deleted: boolean;

  constructor({
    id = dep.Id.makeId(),
    name,
    email,
    password,
    roles = [],
    organization,
    createdOn = Date.now(),
    createdBy,
    modifiedOn = Date.now(),
    modifiedBy,
    deleted = false
  }: Entities.Users.UserData) {
    if (!dep.Id.isValidId(id))
      throw new Error('User must have a valid id.')
    if (!name)
      throw new Error('Please enter a full name for the user.')
    if (!email)
      throw new Error('Please enter a email.')
    if (!dep.Names.IsValidName(name))
      throw new Error('Please enter a valid name for the user.')
    if (!dep.Emails.IsValidEmail(email))
      throw new Error('Please enter a valid email for the user.')

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.organization = organization;

    this.roles = roles;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.modifiedOn = modifiedOn;
    this.modifiedBy = modifiedBy;
    this.deleted = deleted;

  }



  setPassword = (password: string) => this.password = password;

  getData = () => {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      organization: this.organization,
      roles: this.roles,
      createdOn: this.createdOn,
      createdBy: this.createdBy,
      modifiedOn: this.modifiedOn,
      modifiedBy: this.modifiedBy,
      deleted: this.deleted
    }
  }
}