///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { VolovanOrganization } from '../../entities';

export const createOrganization = async (OrganizationData: Entities.Organizations.OrganizationData) => {


  const newOrganization = new VolovanOrganization(OrganizationData);
  const organizationFound = await dep.volovanDb.findByQuery({ name: newOrganization.name, deleted: false }, 'organizations');

  if (organizationFound.length > 0)
    throw new Error('A Organization with the same name is already registered.')


  return await dep.volovanDb.insertOne(newOrganization.getData(), 'organizations') as Entities.Organizations.OrganizationData[]



}