///<reference path="../types/types.d.ts" />
import bcrypt from "bcrypt";
import passwordValidator from 'password-validator';

const schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces()

const comparePassword = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw err;
  }
}

const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw err;
  }
}

const isValidPassword = (password: string) => {
  const passwordValidated = schema.validate(password, { list: false });
  if (typeof passwordValidated !== "boolean") return false;
  else return passwordValidated;
}



export const Passwords = {
  comparePassword,
  hashPassword,
  isValidPassword
}
