///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { createTicket, findTicket, createManyTickets } from '../../use-cases/tickets';

const log = new Logger('POST Tickets Controller')

export const POSTTickets: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'createTicket') {
      if (Array.isArray(httpRequest.body)) {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Tickets.TicketData[] = httpRequest.body;

        //log.debug('Data: ', data);

        for (let i = 0; i < data.length; i++)
          if (httpRequest['userData'])
            data[i].createdBy = httpRequest['userData']['id'];

        successMsg = 'Tickets successfully created.'
        responseData = await createManyTickets(data);
        //log.debug('responseData', responseData)

      } else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Tickets.TicketData = httpRequest.body;

        if (httpRequest['userData'])
          data.createdBy = httpRequest['userData']['id'];

        successMsg = 'Ticket successfully created.'
        responseData = await createTicket(data);

      }
    }

    if (usecase === 'findTicket') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Tickets.TicketData = httpRequest.body;

        successMsg = 'Ticket found.'
        responseData = await findTicket(data);

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