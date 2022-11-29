import bodyParser from 'body-parser';
import express from 'express';
import { Logger } from '../utils';

const log = new Logger('Email Service Router');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/send', async (req, res) => {
  log.debug('Email Service Online');
});


export default router;
