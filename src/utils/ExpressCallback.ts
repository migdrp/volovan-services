import { Response, Request } from 'express';
import { Logger } from './Logger';

const log = new Logger('Express Callback Util');

export function ExpressCallback(controller: Utils.RESTController, usecase: string) {
  return (req: Request, res: Response): void => {

    controller(req, usecase)
      .then((httpResponse: any) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type('json');
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((exception) => res.status(500).send({ error: `Unexpected error. ${exception.message}` }));
  };
}
