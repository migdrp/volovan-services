///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { createParticipant, findParticipant } from '../../use-cases/participants';

const log = new Logger('POST Participants Controller')

export const POSTParticipants: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'createParticipant') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Participants.ParticipantData = httpRequest.body;

        if (httpRequest['userData'])
          data.createdBy = httpRequest['userData']['id'];

        successMsg = 'Participant successfully created.'
        responseData = await createParticipant(data);

      }
    }

    if (usecase === 'findParticipant') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Participants.ParticipantData = httpRequest.body;

        successMsg = 'Participant found.'
        responseData = await findParticipant(data);

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