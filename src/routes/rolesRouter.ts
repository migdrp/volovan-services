import express from 'express';
import { ExpressCallback } from '../utils';
import { validateToken } from '../middlewares';
import { DELETERoles, POSTRoles, PATCHRoles } from '../controllers/roles';

const router = express.Router();

router.use(validateToken);
router.post(`/roles`, ExpressCallback(POSTRoles, 'createRole'));
router.post(`/roles/find`, ExpressCallback(POSTRoles, 'findRole'));
router.delete(`/roles`, ExpressCallback(DELETERoles, 'deleteRole'));
router.patch(`/roles`, ExpressCallback(PATCHRoles, 'editRole'));

export default router;

