///<reference path="../types/types.d.ts" />

import { dep } from '.';
import { Logger } from '../utils/Logger';

const log = new Logger('Mongo Db Adapter');


export class mongoDbAdapter {
  dbName: string;

  constructor(dbName: string) {
    if (!dbName)
      throw new Error(' Must enter a database name to use this adapter.')

    this.dbName = dbName;
  }

  public async findAll(collection: string): Promise<DataAccess.mongoDbAdapterResponse> {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const query = {};
      const cursor = db.collection(collection).find(query);
      const result = (await cursor.toArray()).map(({ _id: id, ...found }) => ({
        id,
        ...found,
      }));
      await mogngoDb.closeDb();
      return result as any[];
    } catch (error) {
      throw new Error(`Error finding all on ${collection}: ${error}`);
    }
  }

  public async findById({ id: _id }: { id: string }, collection: string) {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const result = db.collection(collection).find({ _id: _id, deleted: false });
      const found = await result.toArray();
      if (found.length === 0) {
        return [];
      }
      const { _id: id, ...info } = found[0];

      await mogngoDb.closeDb();

      return [{ id, ...info }] as any[];
    } catch (error) {
      throw new Error(`Error finding id ${_id} on ${collection} collection: ${error}`);
    }
  }


  public async findByIdIncludeDeleted({ id: _id }: { id: string }, collection: string) {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const result = db.collection(collection).find({ _id: _id });
      const found = await result.toArray();
      if (found.length === 0) {
        return [];
      }
      const { _id: id, ...info } = found[0];

      await mogngoDb.closeDb();

      return [{ id, ...info }] as any[];
    } catch (error) {
      throw new Error(`Error finding id ${_id} on ${collection} collection: ${error}`);
    }
  }

  public async findByName({ name: name }: { name: string }, collection: string) {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const result = db.collection(collection).find({ name });
      const found = await result.toArray();
      if (found.length === 0) {
        return [];
      }
      const { _id: id, ...info } = found[0];

      await mogngoDb.closeDb();
      return [{ id, ...info }] as any[];
    } catch (error) {
      throw new Error(`Error finding name ${name} on ${collection} collection: ${error}`);
    }
  }

  public async findMany({ ...query }: { [x: string]: any }, collection: string) {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const found = db.collection(collection).find({ ...query });
      const result = (await found.toArray()).map(({ _id: id, ...found }: any) => ({
        id,
        ...found,
      }));

      await mogngoDb.closeDb();
      return result;
    } catch (error) {
      throw new Error(`Error finding ${query} on ${collection} collection: ${error}`);
    }
  }

  public async findManyWithIdsAray(ids: string[], collection: string) {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const found = db.collection(collection).find({ _id: { $in: ids } });
      const result = (await found.toArray()).map(({ _id: id, ...found }: any) => ({
        id,
        ...found,
      }));

      await mogngoDb.closeDb();
      return result;
    } catch (error) {
      throw new Error(`Error finding items on ${collection} collection: ${error}`);
    }
  }

  public async insertOne({ id: _id, ...data }: { id: any;[x: string]: any }, collection: string) {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const result = await db.collection(collection).insertOne({ _id, ...data });
      log.debug('[insertOne] Result: ', result);
      if (result.acknowledged) {
        const response = await db.collection(collection).findOne({ _id: result.insertedId });


        let insertedItem = { id: response._id, ...response } as any
        delete insertedItem._id;

        return [insertedItem];

      } else {
        throw new Error(`Error inserting data on ${collection} collection:`);
      }
    } catch (error) {
      throw new Error(`Error inserting ${_id} on ${collection} collection: ${error}`);
    }
  }

  public async insertMany(data: any[], collection: string): Promise<DataAccess.mongoDbAdapterResponse> {
    try {

      const ids = []
      const sanitazedData = data.map(item => {
        const newItem = { ...item };
        ids.push(newItem.id);
        newItem._id = newItem.id;
        delete newItem.id;
        return newItem;
      });


      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      await db.collection(collection).insertMany(sanitazedData);
      const result = await this.findManyWithIdsAray(ids, collection);
      return result;

    } catch (error) {
      throw new Error(`Error inserting items on ${collection} collection: ${error}`);
    }
  }

  public async updateOne({ id: _id, ...data }: { id: string }, collection: string): Promise<any[]> {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);

      const result = await db.collection(collection).updateOne({ _id: _id }, { $set: { ...data } }, { upsert: true });

      await mogngoDb.closeDb();
      let response = result.modifiedCount > 0 ? [{ id: _id, ...data }] as any[] : [];

      if (response.length === 0)
        response = await this.findById({ id: _id }, collection)


      return response;
    } catch (error) {
      throw new Error(`Error updating ${_id} on ${collection} collection: ${error}`);
    }
  }

  public async updateMany(data: any[], collection: string) {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);

      const updateQueryObject: any[] = [];

      for (let i = 0; i < data.length; i++) {
        updateQueryObject.push({ $set: { ...data[i] } });
      }

      const result = await db.collection(collection).updateMany({}, updateQueryObject, { upsert: true });

      await mogngoDb.closeDb();
      return result.modifiedCount > 0 ? data : [];
    } catch (error) {
      throw new Error(`Error updating items on ${collection} collection: ${error}`);
    }
  }

  public async removeById({ id: _id }: { id: string }, collection: string): Promise<number> {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const result = await db.collection(collection).deleteOne({ _id });

      await mogngoDb.closeDb();
      return result.deletedCount;
    } catch (error) {
      throw new Error(`Error removing ${_id} on ${collection} collection: ${error}`);
    }
  }

  public async removeByQuery({ ...query }: { [x: string]: any }, collection: string): Promise<number> {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const newQuery = { ...query };
      const result = await db.collection(collection).deleteMany(newQuery);

      await mogngoDb.closeDb();
      return result.deletedCount;
    } catch (error) {
      throw new Error(`Error removing ${query} on ${collection} collection: ${error}`);
    }
  }

  public async findByQuery({ ...query }: { [x: string]: any }, collection: string) {
    try {
      const mogngoDb = new dep.MongoDatabase();
      const db = await mogngoDb.initDb(this.dbName);
      const newQuery = { ...query };

      if (newQuery.id !== null && newQuery.id !== undefined) {
        newQuery._id = newQuery.id;
        delete newQuery.id
      }

      const found = db.collection(collection).find(newQuery);
      const result = (await found.toArray()).map(({ _id: id, ...found }: any) => ({
        id,
        ...found,
      }));

      await mogngoDb.closeDb();
      return result;
    } catch (error) {
      throw new Error(`Error finding ${query} on ${collection} collection: ${error}`);
    }
  }
}
