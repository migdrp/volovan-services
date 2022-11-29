
declare module Payments {
  interface OpenPayChargeRequestData {
    source_id?: any,
    method?: string,
    amount?: number,
    currency?: string,
    description?: string,
    order_id?: string,
    device_session_id?: string,
    customer: OpenPayCustomerData
  }


  interface OpenPayCustomerData {
    name?: string,
    last_name?: string,
    phone_number?: string,
    email?: string
  }

  interface OpenPayErrorObjectData {
    category?: string,
    description?: string,
    http_code?: number,
    error_code?: number,
    request_id?: string,
    fraud_rules?: string[]
  }

  interface OpenPayCardTokenResponse {
    data?: {
      id?: string,
      card?: {
        card_number?: string,
        holder_name?: string,
        expiration_year?: string,
        expiration_month?: string,
        address?: any,
        creation_date?: any,
        brand?: string,
        points_card?: boolean,
        points_type?: string,
        type?: string
      }
    },
    status?: number
  }

  interface OpenPayTransactionObjectData {
    id?: string
    authorization?: any
    transaction_type?: string
    operation_type?: string
    currency?: string
    method?: string
    creation_date?: string
    order_id?: string
    status?: string
    amount?: number
    description?: string
    error_message?: any
    customer_id?: string
    bank_account?: {
      rfc?: string
      mobile?: any
      alias?: any
      bank_name?: string
      creation_date?: string
      clabe?: string
      holder_name?: string
      bank_code?: string
    }
  }

  interface PaymentDataOpenPay {
    personsData?: Entities.Persons.PersonData[],
    providerData?: {
      tokenData?: OpenPayCardTokenResponse['data'];
      sessionId?: string;
    }
    volovanOrderData?: Entities.Orders.OrderData
  }

  interface StripePreparePaymentData {
    personsData?: Entities.Persons.PersonData[],
    volovanOrderData?: Entities.Orders.OrderData
  }

  interface StripeCompletePaymentData {
    volovanOrderData?: Entities.Orders.OrderData
  }

  interface StripePreparePaymentResponse {
    paymentIntent?: any
    createdOrder?: Entities.Orders.OrderData
  }


}