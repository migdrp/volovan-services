///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateRole, validateToken } from '../middlewares';
import { DELETETickets, POSTTickets, PATCHTickets } from '../controllers/tickets';

const router = express.Router();

router.use(validateToken);
router.post(`/tickets`, validateRole(['Volovan Admin']), ExpressCallback(POSTTickets, 'createTicket'));
router.post(`/tickets/find`, validateRole(['Volovan Admin', 'Scan Code']), ExpressCallback(POSTTickets, 'findTicket'));
router.delete(`/tickets`, validateRole(['Volovan Admin']), ExpressCallback(DELETETickets, 'deleteTicket'));
router.patch(`/tickets`, validateRole(['Volovan Admin', 'Scan Code']), ExpressCallback(PATCHTickets, 'editTicket'));

export default router;

