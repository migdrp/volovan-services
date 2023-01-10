///<reference path="../types/types.d.ts" />
import { argv } from 'yargs';
import dotenv from 'dotenv';

export const Environment = () => {
  const env = argv['env'];

  console.info(`[Env] Configuring ${env} environment...`)

  if (!env)
    throw Error('env argument must be "prod" or "devlocal" or "devcloud"')

  if (env !== 'prod' && env !== 'devlocal' && env !== 'devcloud')
    throw Error('env argument must be "prod" or "devlocal" or "devcloud"')

  dotenv.config({ path: `.env.${env}.env` });

}
