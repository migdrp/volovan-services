import { argv } from 'yargs';
import dotenv from 'dotenv';

export const Environment = () => {
  const env = argv['env'];

  console.info(`[Env] Configuring ${env} environment...`)

  if (!env)
    throw Error('env argument must be "prod" or "dev"')

  if (env !== 'prod' && env !== 'dev')
    throw Error('env argument must be "prod" or "dev"')

  dotenv.config({ path: `.env.${env}.env` });

}
