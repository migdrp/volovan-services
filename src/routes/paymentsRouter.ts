///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateRole, validateToken } from '../middlewares';
import { POSTPayments } from '../controllers/payments';

const router = express.Router();




router.post("/prepare", ExpressCallback(POSTPayments, 'prepareAccessPayment'));
router.post("/complete", ExpressCallback(POSTPayments, 'completeAccessPayment'));
router.post("/intents/delete", validateToken, validateRole(['Volovan Admin']), ExpressCallback(POSTPayments, 'cancelPaymentIntent'));
router.post("/intents/search", validateToken, validateRole(['Volovan Admin']), ExpressCallback(POSTPayments, 'searchPaymentIntent'));


export default router;

