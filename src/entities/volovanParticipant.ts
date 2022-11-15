///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan Role Entty');


export class VolovanParticipant {

  id: string;
  name: string;
  type: string;
  description: string;
  images: Entities.Participants.ParticipantImage[];
  docs: Entities.Participants.ParticipantFile[];
  tickets: string[];
  persons: string[];
  socialMedia: Entities.Participants.SocialMedia[];


  createdOn: number;
  createdBy: string;
  modifiedOn: number;
  modifiedBy: string;
  deleted: boolean;


  constructor({
    id = dep.Id.makeId(),
    name,
    description = 'Participant without description.',
    type,
    images,
    docs,
    persons,
    socialMedia,


    createdOn = Date.now(),
    createdBy,
    modifiedOn = Date.now(),
    modifiedBy,
    deleted = false
  }: Entities.Participants.ParticipantData) {

    const participantTypes = ['artist', 'business', 'guest'];
    if (!dep.Id.isValidId(id))
      throw new Error('Participant must have a valid id.')
    if (!name)
      throw new Error('Participant must have a name.')
    if (!type)
      throw new Error('Participant must have a type.')
    if (!participantTypes.includes(type))
      throw new Error(`Participant must have a valid type. (${participantTypes.join(',')})`)

    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.images = images;
    this.docs = docs;
    this.persons = persons;
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
      type: this.type,
      images: this.images,
      docs: this.docs,
      tickets: this.tickets,
      persons: this.persons,
      socialMedia: this.socialMedia,

      createdOn: this.createdOn,
      createdBy: this.createdBy,
      modifiedOn: this.modifiedOn,
      modifiedBy: this.modifiedBy,
      deleted: this.deleted
    }
  }
}