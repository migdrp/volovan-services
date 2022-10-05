import { MongoClient } from 'mongodb';
import { Logger } from '../utils/Logger';

const log = new Logger('Mongo Database');

export class MongoDatabase {

  uri: string;
  client: MongoClient;

  constructor() {
    if (!process.env.MONGODB_URI)
      throw new Error('Database url not found');
    this.uri = process.env.MONGODB_URI;
    this.client = new MongoClient(this.uri);
  }

  public async initDb(dbName: string) {
    try {
      return this.client.db(dbName);
    } catch (err) {
      throw err;
    }
  }

  public async closeDb() {
    try {
      await this.client.close();
      //log.debug('Db connection closed succsessfully.');
    } catch (err) {
      throw err;
    }
  }
}
