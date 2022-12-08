///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateRole, validateToken } from '../middlewares';
import { DELETEPersons, POSTPersons, PATCHPersons } from '../controllers/persons';

const router = express.Router();

router.use(validateToken);
router.post(`/persons`, ExpressCallback(POSTPersons, 'createPerson'));
router.post(`/persons/find`, validateRole(['Volovan Admin', 'Scan Code']), ExpressCallback(POSTPersons, 'findPerson'));
router.delete(`/persons`, validateRole(['Volovan Admin']), ExpressCallback(DELETEPersons, 'deletePerson'));
router.patch(`/persons`, validateRole(['Volovan Admin']), ExpressCallback(PATCHPersons, 'editPerson'));

export default router;

