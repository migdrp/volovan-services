///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { createRole, findRole } from '../../use-cases/roles';

const log = new Logger('POST Roles Controller')

export const POSTRoles: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'createRole') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Roles.RoleData = httpRequest.body;

        if (httpRequest['userData'])
          data.createdBy = httpRequest['userData']['id'];

        successMsg = 'Role successfully created.'
        responseData = await createRole(data);

      }
    }

    if (usecase === 'findRole') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Roles.RoleData = httpRequest.body;

        successMsg = 'Roles found.'
        responseData = await findRole(data);

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