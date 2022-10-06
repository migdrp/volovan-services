///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan Role Entty');


export class VolovanRole {

  id: string;
  name: string;
  description: string;
  dynamicRoutes: Object;

  createdOn: number;
  createdBy: string;
  modifiedOn: number;
  modifiedBy: string;
  deleted: boolean;


  constructor({
    id = dep.Id.makeId(),
    name,
    description = 'Role without description.',
    dynamicRoutes,

    createdOn = Date.now(),
    createdBy,
    modifiedOn = Date.now(),
    modifiedBy,
    deleted = false
  }: Entities.Roles.RoleData) {

    if (!dep.Id.isValidId(id))
      throw new Error('Tool must have a valid id.')

    this.id = id;
    this.name = name;
    this.description = description;
    this.dynamicRoutes = dynamicRoutes;

    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.modifiedOn = modifiedOn;
    this.modifiedBy = modifiedBy;
    this.deleted = deleted;

  }

  getData = () => {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      dynamicRoutes: this.dynamicRoutes,

      createdOn: this.createdOn,
      createdBy: this.createdBy,
      modifiedOn: this.modifiedOn,
      modifiedBy: this.modifiedBy,
      deleted: this.deleted
    }
  }
}