///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateRole, validateToken } from '../middlewares';
import { POSTOrders, PATCHOrders } from '../controllers/orders';

const router = express.Router();

router.use(validateToken);
router.post(`/orders/find`, validateRole(['Volovan Admin']), ExpressCallback(POSTOrders, 'findOrder'));
router.patch(`/orders`, validateRole(['Volovan Admin']), ExpressCallback(PATCHOrders, 'editOrder'));

export default router;

