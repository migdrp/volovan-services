///<reference path="../types/types.d.ts" />

import { validate } from 'email-validator'

const IsValidEmail: Utils.IsValidEmail = (email: string) => {

  return validate(email)
}

export const Emails = {
  IsValidEmail
}

