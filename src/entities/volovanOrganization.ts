///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan Role Entty');


export class VolovanOrganization {

  id: string;
  name: string;
  description: string;

  images: Entities.Organizations.OrganizationImage[];
  docs: Entities.Organizations.OrganizationFiles[];
  socialMedia: Entities.Organizations.SocialMedia[];


  createdOn: number;
  createdBy: string;
  modifiedOn: number;
  modifiedBy: string;
  deleted: boolean;


  constructor({
    id = dep.Id.makeId(),
    name,
    description = 'Organization without description.',

    images = [],
    docs = [],
    socialMedia = [],


    createdOn = Date.now(),
    createdBy,
    modifiedOn = Date.now(),
    modifiedBy,
    deleted = false
  }: Entities.Participants.ParticipantData) {

    if (!dep.Id.isValidId(id))
      throw new Error('Participant must have a valid id.')
    if (!name)
      throw new Error('Participant must have a name.')

    this.id = id;
    this.name = name;
    this.description = description
      ;
    this.images = images;
    this.docs = docs;
    this.socialMedia = socialMedia;

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

      images: this.images,
      docs: this.docs,
      socialMedia: this.socialMedia,

      createdOn: this.createdOn,
      createdBy: this.createdBy,
      modifiedOn: this.modifiedOn,
      modifiedBy: this.modifiedBy,
      deleted: this.deleted
    }
  }
}