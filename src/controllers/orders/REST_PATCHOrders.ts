///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { editeOrder } from '../../use-cases/orders';

const log = new Logger('PATCH Orders Controller')

export const PATCHOrders: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'editOrder') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Orders.OrderData = httpRequest.body;

        if (httpRequest['userData']) {
          data.modifiedOn = Date.now();
        }

        successMsg = 'Order successfully modified.'
        responseData = await editeOrder(data);

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