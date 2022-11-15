///<reference path="../types/types.d.ts" />
import bcrypt from "bcrypt";
import passwordValidator from 'password-validator';
import crypto from 'crypto';

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

const generateRandoString = () => {
  var token = crypto.randomBytes(64).toString('hex');
  return token;
}

const generateKeys = () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  return {
    privateKey, publicKey
  }
}



export const Passwords = {
  comparePassword,
  hashPassword,
  isValidPassword,
  generateRandoString,
  generateKeys
}
