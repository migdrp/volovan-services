///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';
const log = new Logger('Volovan Role Entty');


export class VolovanEvent {

  id: string;
  name: string;
  description: string;
  dateTimes: number[];
  unlockedDatetime: number;
  participants: string[];
  participantsTimes: Entities.Events.ParticipantTime[];
  tickets: string[];
  images: Entities.Events.EventImage[];
  docs: Entities.Events.EventFile[];
  route: string;
  location: string;
  mainImage: string;
  prices: Entities.Events.Price[];
  socialMedia: Entities.Events.SocialMedia[];

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
    unlockedDatetime,
    participants,
    participantsTimes,
    tickets,
    images = [],
    docs = [],
    route,
    location,
    mainImage,
    prices,
    socialMedia,


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
    this.unlockedDatetime = unlockedDatetime;
    this.participants = participants;
    this.participantsTimes = participantsTimes;
    this.tickets = tickets;
    this.images = images;
    this.docs = docs;
    this.route = route;
    this.location = location;
    this.mainImage = mainImage;
    this.prices = prices;
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
      dateTimes: this.dateTimes,
      unlockedDatetime: this.unlockedDatetime,
      participants: this.participants,
      participantsTimes: this.participantsTimes,
      tickets: this.tickets,
      images: this.images,
      docs: this.docs,
      route: this.route,
      location: this.location,
      mainImage: this.mainImage,
      prices: this.prices,
      socialMedia: this.socialMedia,

      createdOn: this.createdOn,
      createdBy: this.createdBy,
      modifiedOn: this.modifiedOn,
      modifiedBy: this.modifiedBy,
      deleted: this.deleted
    }
  }
}