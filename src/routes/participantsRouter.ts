///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateToken } from '../middlewares';
import { DELETEParticipants, POSTParticipants, PATCHParticipants } from '../controllers/participants';

const router = express.Router();

router.use(validateToken);
router.post(`/participants`, ExpressCallback(POSTParticipants, 'createParticipant'));
router.post(`/participants/find`, ExpressCallback(POSTParticipants, 'findParticipant'));
router.delete(`/participants`, ExpressCallback(DELETEParticipants, 'deleteParticipant'));
router.patch(`/participants`, ExpressCallback(PATCHParticipants, 'editParticipant'));

export default router;

