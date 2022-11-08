///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateToken } from '../middlewares';
import { DELETEEvents, POSTEvents, PATCHEvents } from '../controllers/events';

const router = express.Router();

router.use(validateToken);
router.post(`/events`, ExpressCallback(POSTEvents, 'createEvent'));
router.post(`/events/find`, ExpressCallback(POSTEvents, 'findEvent'));
router.delete(`/events`, ExpressCallback(DELETEEvents, 'deleteEvent'));
router.patch(`/events`, ExpressCallback(PATCHEvents, 'editEvent'));

export default router;

