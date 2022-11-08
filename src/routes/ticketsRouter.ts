///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateToken } from '../middlewares';
import { DELETETickets, POSTTickets, PATCHTickets } from '../controllers/tickets';

const router = express.Router();

router.use(validateToken);
router.post(`/tickets`, ExpressCallback(POSTTickets, 'createTicket'));
router.post(`/tickets/find`, ExpressCallback(POSTTickets, 'findTicket'));
router.delete(`/tickets`, ExpressCallback(DELETETickets, 'deleteTicket'));
router.patch(`/tickets`, ExpressCallback(PATCHTickets, 'editTicket'));

export default router;

