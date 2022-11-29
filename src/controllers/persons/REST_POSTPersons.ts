///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { createPerson, findPerson, createManyPersons } from '../../use-cases/persons';

const log = new Logger('POST Persons Controller')

export const POSTPersons: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'createPerson') {
      if (Array.isArray(httpRequest.body)) {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Persons.PersonData[] = httpRequest.body;

        //log.debug('Data: ', data);

        for (let i = 0; i < data.length; i++)
          if (httpRequest['userData'])
            data[i].createdBy = httpRequest['userData']['id'];

        successMsg = 'Persons successfully created.'
        responseData = await createManyPersons(data);
        //log.debug('responseData', responseData)

      } else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Persons.PersonData = httpRequest.body;

        if (httpRequest['userData'])
          data.createdBy = httpRequest['userData']['id'];


        successMsg = 'Person successfully created.'
        responseData = await createPerson(data);

      }
    }

    if (usecase === 'findPerson') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Persons.PersonData = httpRequest.body;

        successMsg = 'Person found.'
        responseData = await findPerson(data);

      }
    }

    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 201,
      body: {
        status: 'success',
        message: successMsg,
        data: responseData,
        count: responseData.length,
      },
    };

  } catch (err) {
    log.error(err.stack || err);
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 400,
      body: {
        status: 'error',
        message: err.message,
      },
    };
  }
}