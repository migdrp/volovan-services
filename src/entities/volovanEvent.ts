///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan Role Entty');


export class VolovanEvent {

  id: string;
  name: string;
  description: string;
  dateTimes: number[];
  participants: string[];
  tickets: string[];
  images: Entities.Events.EventImage[];
  docs: Entities.Events.EventFile[];
  route: string;
  location: string;
  mainImage: string;

  createdOn: number;
  createdBy: string;
  modifiedOn: number;
  modifiedBy: string;
  deleted: boolean;


  constructor({
    id = dep.Id.makeId(),
    name,
    description = 'Event without description.',
    dateTimes,
    participants,
    tickets,
    images = [],
    docs = [],
    route,
    location,
    mainImage,


    createdOn = Date.now(),
    createdBy,
    modifiedOn = Date.now(),
    modifiedBy,
    deleted = false
  }: Entities.Events.EventData) {

    if (!dep.Id.isValidId(id))
      throw new Error('Event must have a valid id.')
    if (!dateTimes || dateTimes.length === 0)
      throw new Error('At least one datetime for the event is required.')


    this.id = id;
    this.name = name;
    this.description = description;
    this.dateTimes = dateTimes;
    this.participants = participants;
    this.tickets = tickets;
    this.images = images;
    this.docs = docs;
    this.route = route;
    this.location = location;
    this.mainImage = mainImage;

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
      dateTimes: this.dateTimes,
      participants: this.participants,
      tickets: this.tickets,
      images: this.images,
      dosc: this.docs,
      route: this.route,
      location: this.location,
      mainImage: this.mainImage,

      createdOn: this.createdOn,
      createdBy: this.createdBy,
      modifiedOn: this.modifiedOn,
      modifiedBy: this.modifiedBy,
      deleted: this.deleted
    }
  }
}