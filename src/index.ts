import { Logger, Environment } from './utils';
import { usersRouter, authRoutes, rolesRouter, eventsRouter, personsRouter, participantsRouter, ticketsRouter } from './routes';
import { tokenPlacer, validateToken } from './middlewares';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

Environment();
Logger.env = process.env.NODE_ENV;

const log = new Logger('Volovan Microservice');
const app = express();


async function main() {
  try {
    app.use(cookieParser());
    app.use(cors({ origin: true, credentials: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(tokenPlacer);

    app.get("/", (req, res) => {
      res.json({ message: "Welcome to Volovan Production API Services." });
    });

    app.get("/secure", validateToken, (req, res) => {
      res.json({ message: "Welcome to Volovan Production API secure resource.  🙌" });
    });

    app.use('/api', usersRouter);
    app.use('/api', rolesRouter);
    app.use('/api', personsRouter);
    app.use('/api', participantsRouter);
    app.use('/api', eventsRouter);
    app.use('/api', ticketsRouter);
    app.use('/auth', authRoutes);

    app.listen(process.env.PORT);
    log.debug('Server is running on port: ', process.env.PORT);
  } catch (err) {
    log.error(err.stack || err);
    throw err;
  }
}

main();