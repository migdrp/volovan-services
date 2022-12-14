///<reference path="../../types/types.d.ts" />


import { Logger } from '../../utils';
import { editePerson } from '../../use-cases/persons';

const log = new Logger('PATCH Persons Controller')

export const PATCHPersons: Utils.RESTController = async (httpRequest, usecase) => {
  try {
    let successMsg = '';
    let responseData = [];

    if (usecase === 'editPerson') {
      if (Array.isArray(httpRequest.body)) throw new Error('This enpoint do not support arrays yet...');
      else {

        if (!httpRequest.body)
          throw new Error('The request body can not be empty.');

        const data: Entities.Persons.PersonData = httpRequest.body;

        if (httpRequest['userData']) {
          data.modifiedBy = httpRequest['userData']['id'];
          data.modifiedOn = Date.now();
        }

        successMsg = 'Person successfully modified.'
        responseData = await editePerson(data);

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