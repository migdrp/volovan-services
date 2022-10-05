
import jwt from 'jsonwebtoken';

const generateAccessToken = (userData: Entities.Users.UserData) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_ACCESS_TIME)
    throw new Error('There was an error in the authentication service utility. Please try again latter.');

  return jwt.sign({ sub: userData, iat: Date.now() }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_ACCESS_TIME) });
}


const generateRefreshToken = (userData: Entities.Users.UserData) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_TIME)
    throw new Error('There was an error in the authentication service utility. Please try again latter.');

  return jwt.sign({ sub: userData, iat: Date.now() }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_REFRESH_TIME) });
}


const verifyToken = (token: string) => {
  try {
    if (!process.env.JWT_SECRET)
      throw new Error('There was an error in the authentication service utility. Please try again latter.');
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }
}




export const AuthTokens = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
}