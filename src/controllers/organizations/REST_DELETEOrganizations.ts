///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { deleteOrganization } from '../../use-cases/organizations';

const log = new Logger('DELETE Organizations Controller')

export const DELETEOrganizations: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'deleteOrganization') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Organizations.OrganizationData = httpRequest.body;

        if (httpRequest['organizationData']) {
          data.modifiedBy = httpRequest['organizationData']['id'];
          data.modifiedOn = Date.now();
        }

        successMsg = 'Organization successfully deleted.'
        responseData = await deleteOrganization(data);

      }
    }

    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 201,
      body: {
        status: 'success',
        message: successMsg,
        data: responseData,
        count: responseData.length,
      },
    };

  } catch (err) {
    log.error(err.stack || err);
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 400,
      body: {
        status: 'error',
        message: err.message,
      },
    };
  }
}