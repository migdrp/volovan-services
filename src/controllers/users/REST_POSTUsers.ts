///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { createUser, findUser } from '../../use-cases/users';

const log = new Logger('POST Users Controller')

export const POSTUsers: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'createUser') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Users.UserData = httpRequest.body;

        if (httpRequest['userData'])
          data.createdBy = httpRequest['userData']['id'];

        successMsg = 'User successfully created.'
        responseData = await createUser(data);

      }
    }

    if (usecase === 'findUser') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Users.UserData = httpRequest.body;

        successMsg = 'User found.'
        responseData = await findUser(data);

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