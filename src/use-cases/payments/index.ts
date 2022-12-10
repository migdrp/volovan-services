import { volovanDb } from '../../adapters';
import { sendTicketsEmail, StripePayments } from '../../utils';
import { prepareAccesPayment } from './prepareAccesPayment';
import { cancelPaymentIntent } from './cancelPaymentIntent';
import { completeAccessPayment } from './completeAccessPayment';
import { searchPaymentIntent } from './searchPaymentIntent';
import { cashAccessPayment } from './cashAccessPayment';


export const dep = {
  volovanDb,
  sendTicketsEmail,
  StripePayments

}


export {
  prepareAccesPayment,
  cancelPaymentIntent,
  completeAccessPayment,
  searchPaymentIntent,
  cashAccessPayment
}