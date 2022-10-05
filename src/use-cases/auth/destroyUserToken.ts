import { dep } from '.';
import { Logger } from '../../utils';

const log = new Logger('Destroy User Token Use Case');

export const destroyUserToken = async (token: string) => {
  try {

    const validatesToken = dep.AuthTokens.verifyToken(token);
    const userData = validatesToken.sub as Entities.Users.UserData;

    const tokenExist: Entities.Auth.TokenData[] = await dep.volovanDb.findById({ id: userData.id }, 'tokens');
    log.debug('tokenExist', tokenExist);

    if (tokenExist.length > 0)
      await dep.volovanDb.removeById({ id: userData.id }, 'tokens');

    return userData;
  } catch (err) {
    log.error(err.stack || err);
    throw err;
  }
}