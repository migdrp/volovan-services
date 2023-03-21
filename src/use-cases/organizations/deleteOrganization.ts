///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Delete Organizations Use Case');

export const deleteOrganization = async (entityData: Entities.Organizations.OrganizationData) => {

  if (!entityData.id) throw new Error('You must enter the organization id to complete the operation');
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'organizations') as Entities.Organizations.OrganizationData[];


  if (entityFound.length === 0)
    throw new Error('The organization id provided was not found in the database.')

  const data = entityFound[0];
  data.deleted = true;

  const deleted = await dep.volovanDb.updateOne({ id: data.id, ...data }, 'organizations') as Entities.Organizations.OrganizationData[];

  return deleted;

}