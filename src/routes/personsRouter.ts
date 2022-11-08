///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateToken } from '../middlewares';
import { DELETEPersons, POSTPersons, PATCHPersons } from '../controllers/persons';

const router = express.Router();

router.use(validateToken);
router.post(`/persons`, ExpressCallback(POSTPersons, 'createPerson'));
router.post(`/persons/find`, ExpressCallback(POSTPersons, 'findPerson'));
router.delete(`/persons`, ExpressCallback(DELETEPersons, 'deletePerson'));
router.patch(`/persons`, ExpressCallback(PATCHPersons, 'editPerson'));

export default router;

