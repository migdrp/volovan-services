///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanOrganization } from '../../entities';

export const editeOrganization = async (entityData: Entities.Organizations.OrganizationData) => {



  if (!entityData.id) throw new Error('Id attribute must be provided');
  if (entityData.deleted) delete entityData.deleted;
  const entityFound = await dep.volovanDb.findById({ id: entityData.id }, 'organizations') as Entities.Organizations.OrganizationData[];
  if (entityFound.length === 0) throw new Error('The organization with the id provided do not exist on the database.');
  const modifiedData = { ...entityFound[0], ...entityData };
  const newEntity = new VolovanOrganization(modifiedData);

  return await dep.volovanDb.updateOne(newEntity.getData(), 'organizations') as Entities.Organizations.OrganizationData[]

}