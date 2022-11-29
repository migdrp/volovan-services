///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Cancel Payment Intent Use Case');

export const cancelPaymentIntent = async (data: any) => {


  log.debug('Payment intent data: ', data)

  const resposne = await dep.StripePayments.cancelPaymentIntent(data.id);

  return resposne;
}