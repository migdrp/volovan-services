///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateToken, validateRole } from '../middlewares';
import { POSTEvents } from '../controllers/events';
import { POSTParticipants } from '../controllers/participants';

const router = express.Router();

router.post(`/public/events/find`, ExpressCallback(POSTEvents, 'findEvent'));
router.post(`/public/participants/find`, ExpressCallback(POSTParticipants, 'findParticipant'));

export default router;

