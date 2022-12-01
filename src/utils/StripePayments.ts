///<reference path="../types/types.d.ts" />

import { Logger } from './Logger';
import { Stripe } from 'stripe';

const log = new Logger('Stripe Payments Util');

export class StripePayments {


  static getStripeLibrary = () => {
    const stripe = new Stripe(process.env.STRIPE_SK, { apiVersion: '2022-11-15' });
    return stripe;
  }

  static createCustomer = async (data: Stripe.CustomerCreateParams) => {
    try {
      const stripe = StripePayments.getStripeLibrary();
      return await stripe.customers.create(data);
    } catch (err) {
      throw err;
    }
  }


  static findCustomerByNameAndEmail = async (fullName: string, email: string) => {
    try {
      const stripe = StripePayments.getStripeLibrary();
      return await stripe.customers.search({ query: `name:\'${fullName}\' AND email:\'${email}\'` });
    } catch (err) {
      throw err;
    }
  }


  static createPaymentIntent = async (data: Stripe.PaymentIntentCreateParams) => {
    try {
      const stripe = StripePayments.getStripeLibrary();
      return await stripe.paymentIntents.create(data);
    } catch (err) {
      throw err;
    }
  }


  static cancelPaymentIntent = async (id: string) => {
    const stripe = StripePayments.getStripeLibrary();
    const paymentIntent = await stripe.paymentIntents.cancel(id);
    return paymentIntent;
  }



  static findPaymentIntent = async (id: string) => {
    const stripe = StripePayments.getStripeLibrary();
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    return paymentIntent;
  }


  static findPaymentIntentByStatus = async (id: string, status: string) => {
    const stripe = StripePayments.getStripeLibrary();
    const paymentIntent = await stripe.paymentIntents.search({ query: `id:\'${id}\' AND status:\'${status}\'` });
    return paymentIntent;
  }

}