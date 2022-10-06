///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { editeUser } from '../../use-cases/users';

const log = new Logger('PATCH Users Controller')

export const PATCHUsers: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'editUser') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Users.UserData = httpRequest.body;

        if (httpRequest['userData']) {
          data.modifiedBy = httpRequest['userData']['id'];
          data.modifiedOn = Date.now();
        }

        successMsg = 'User successfully modified.'
        responseData = await editeUser(data);

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