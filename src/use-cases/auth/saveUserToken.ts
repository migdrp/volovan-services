import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Save User Token Use Case');

export const saveUserToken = async (userData: Entities.Users.UserData) => {
  try {
    const accessToken = dep.AuthTokens.generateAccessToken(userData);
    const refreshToken = dep.AuthTokens.generateRefreshToken(userData);

    const tokenExist: Entities.Auth.TokenData[] = (await dep.volovanDb.findByIdIncludeDeleted({ id: userData.id }, 'tokens'));
    log.debug('tokenExist', tokenExist);

    if (tokenExist) {
      if (tokenExist.length > 0) {
        const data = { token: refreshToken };
        await dep.volovanDb.updateOne({ id: userData.id, ...data }, 'tokens');
      } else {
        const data = { token: refreshToken };
        await dep.volovanDb.insertOne({ id: userData.id, ...data }, 'tokens');
      }
    } else {
      const data = { token: refreshToken };
      await dep.volovanDb.insertOne({ id: userData.id, ...data }, 'tokens');
    }


    return { accessToken, refreshToken };
  } catch (err) {
    log.error(err.stack || err);
    throw err;
  }
}