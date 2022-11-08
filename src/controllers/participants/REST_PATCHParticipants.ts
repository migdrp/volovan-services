///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { editeParticipant } from '../../use-cases/participants';

const log = new Logger('PATCH Participants Controller')

export const PATCHParticipants: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'editParticipant') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Participants.ParticipantData = httpRequest.body;

        if (httpRequest['participantData']) {
          data.modifiedBy = httpRequest['participantData']['id'];
          data.modifiedOn = Date.now();
        }

        successMsg = 'Participant successfully modified.'
        responseData = await editeParticipant(data);

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