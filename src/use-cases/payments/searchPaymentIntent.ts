///<reference path="../../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Search Payment Intent Use Case');

export const searchPaymentIntent = async (data: any) => {


  log.debug('Payment intent data: ', data)
  if (!data.id)
    throw new Error('Must priovde attributes id, status')
  const resposne = await dep.StripePayments.findPaymentIntent(data.id);

  return resposne;
}