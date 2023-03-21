import { Id, Names, Emails, Passwords, ImageManager } from '../utils';


import { VolovanRole } from './volovanRole';
import { VolovanUser } from './volovanUser';
import { VolovanEvent } from './volovanEvent';
import { VolovanParticipant } from './volovanParticipant';
import { VolovanTicket } from './volovanTicket';
import { VolovanPerson } from './volovanPerson';
import { VolovanOrder } from './volovanOrder';
import { VolovanOrganization } from './volovanOrganization';

export const dep = {
  Id,
  Names,
  Emails,
  Passwords,
  ImageManager
}


export {
  VolovanRole,
  VolovanUser,
  VolovanEvent,
  VolovanParticipant,
  VolovanTicket,
  VolovanPerson,
  VolovanOrder,
  VolovanOrganization
}