import { dep } from '.';
import { VolovanUser } from '../../entities';

export const createUser = async (userData: Entities.Users.UserData) => {


  const newUser = new VolovanUser(userData);
  const userFound = await dep.volovanDb.findByQuery({ name: newUser.name, deleted: false }, 'users');

  if (userFound.length > 0)
    throw new Error('A user with the same name is already registered.')

  if (!dep.Passwords.isValidPassword(userData.password))
    throw new Error('Please enter a valid password.')

  const hashedPassword = await dep.Passwords.hashPassword(userData.password);
  newUser.setPassword(hashedPassword);

  return await dep.volovanDb.insertOne(newUser.getData(), 'users') as Entities.Users.UserData[]



}