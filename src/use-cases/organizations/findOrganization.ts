///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Find Organizations Use Case');

export const findOrganization = async (entityData: Entities.Organizations.OrganizationData) => {

  if (!entityData.deleted) entityData.deleted = false;
  const found = await dep.volovanDb.findByQuery({ ...entityData }, 'organizations') as Entities.Organizations.OrganizationData[];


  return found;
}