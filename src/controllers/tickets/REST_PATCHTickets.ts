///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { editeTicket } from '../../use-cases/tickets';

const log = new Logger('PATCH Tickets Controller')

export const PATCHTickets: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'editTicket') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Tickets.TicketData = httpRequest.body;

        if (httpRequest['ticketData']) {
          data.modifiedBy = httpRequest['ticketData']['id'];
          data.modifiedOn = Date.now();
        }

        successMsg = 'Ticket successfully modified.'
        responseData = await editeTicket(data);

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