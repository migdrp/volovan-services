///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateRole, validateToken } from '../middlewares';
import { POSTOrders } from '../controllers/orders';

const router = express.Router();

router.use(validateToken);
router.use(validateRole('Volovan Admin'));
router.post(`/orders/find`, ExpressCallback(POSTOrders, 'findOrder'));

export default router;

