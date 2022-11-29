///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { editeEvent } from '../../use-cases/events';

const log = new Logger('PATCH Events Controller')

export const PATCHEvents: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'editEvent') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Events.EventData = httpRequest.body;

        if (httpRequest['userData']) {
          data.modifiedBy = httpRequest['userData']['id'];
          data.modifiedOn = Date.now();
        }

        successMsg = 'Event successfully modified.'
        responseData = await editeEvent(data);

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