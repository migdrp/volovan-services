
import { Logger } from '../../utils';
import { editRole } from '../../use-cases/roles';

const log = new Logger('PATCH Roles Controller')

export const PATCHRoles: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'editRole') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Roles.RoleData = httpRequest.body;

        if (httpRequest['userData']) {
          data.modifiedBy = httpRequest['userData']['id'];
          data.modifiedOn = Date.now();
        }

        successMsg = 'Role successfully modified.'
        responseData = await editRole(data);

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