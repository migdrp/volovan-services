import { MongoDatabase } from '../data-access';
import { Logger } from '../utils';

import { mongoDbAdapter } from './mongoDbAdapter';


export const dep = {
  Logger,
  MongoDatabase
}



export const volovanDb = new mongoDbAdapter(`volovan-${process.env.NODE_ENV === "production" ? "prod" : process.env.NODE_ENV === "development" ? "dev" : "dev"}`);
