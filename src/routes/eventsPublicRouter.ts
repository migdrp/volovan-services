///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateToken, validateRole } from '../middlewares';
import { DELETEEvents, POSTEvents, PATCHEvents } from '../controllers/events';

const router = express.Router();

router.use(validateToken);
router.use(validateRole('Volovan Frontend'));
router.post(`/public/events/find`, ExpressCallback(POSTEvents, 'findEvent'));

export default router;

