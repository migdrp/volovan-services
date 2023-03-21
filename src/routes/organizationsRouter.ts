///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateRole, validateToken } from '../middlewares';
import { DELETEOrganizations, POSTOrganizations, PATCHOrganizations } from '../controllers/organizations';

const router = express.Router();

router.use(validateToken);
router.use(validateRole(['Volovan Admin']));
router.post(`/organizations`, ExpressCallback(POSTOrganizations, 'createOrganization'));
router.post(`/organizations/find`, ExpressCallback(POSTOrganizations, 'findOrganization'));
router.delete(`/organizations`, ExpressCallback(DELETEOrganizations, 'deleteOrganization'));
router.patch(`/organizations`, ExpressCallback(PATCHOrganizations, 'editOrganization'));

export default router;

