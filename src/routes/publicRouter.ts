///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateToken, validateRole } from '../middlewares';
import { POSTEvents } from '../controllers/events';
import { POSTParticipants } from '../controllers/participants';
import { POSTRoles } from '../controllers/roles';

const router = express.Router();

router.post(`/public/events/find`, ExpressCallback(POSTEvents, 'findEvent'));
router.post(`/public/participants/find`, ExpressCallback(POSTParticipants, 'findParticipant'));
router.post(`/public/roles/find`, ExpressCallback(POSTRoles, 'findRole'));

export default router;

