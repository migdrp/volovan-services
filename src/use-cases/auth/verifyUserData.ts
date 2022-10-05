import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Verify User Data Case');

export const verifyUserData = async (loginData: Entities.Auth.LoginData) => {

  if (!loginData.email) throw new Error(`Please enter the user email.`)
  if (!loginData.password) throw new Error(`Please enter the user password.`)

  const userFound: Entities.Users.UserData = (<Entities.Users.UserData[]>await dep.volovanDb.findByQuery({ email: loginData.email }, 'users'))[0];

  if (!userFound) throw new Error(`User ${loginData.email} not found.`)

  const userVerified = await dep.Passwords.comparePassword(loginData.password, userFound.password);

  if (!userVerified) throw new Error(`The user password is incorrect.`)

  delete userFound.password;

  return userFound;

}