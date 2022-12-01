///<reference path="../../types/types.d.ts" />


import { prepareAccesPayment, cancelPaymentIntent, completeAccessPayment, searchPaymentIntent } from '../../use-cases/payments';
import { Logger } from '../../utils';

const log = new Logger('POST Payments Controller')

export const POSTPayments: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];


    if (usecase === 'prepareAccessPayment') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body || Object.keys(httpRequest.body).length === 0)
          throw new Error('The request body can not be empty.');

        const data: Payments.StripePreparePaymentData = httpRequest.body;

        successMsg = 'Preparando el pago de los accesos.'
        responseData = await prepareAccesPayment(data) as any;

      }
    }


    if (usecase === 'completeAccessPayment') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body || Object.keys(httpRequest.body).length === 0)
          throw new Error('The request body can not be empty.');

        const data: Payments.StripeCompletePaymentData = httpRequest.body;

        successMsg = 'Pago realizado correctamente, por favor revisa la bandeja de entrada de tu correo electrónico.'
        responseData = await completeAccessPayment(data) as any;

      }
    }

    if (usecase === 'cancelPaymentIntent') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: { id: string } = httpRequest.body;

        successMsg = 'Payment intent deleted successfully...'
        responseData = await cancelPaymentIntent(data) as any;

      }
    }

    if (usecase === 'searchPaymentIntent') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: { id: string } = httpRequest.body;

        successMsg = 'Payment intent found  successfully...'
        responseData = await searchPaymentIntent(data) as any;

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