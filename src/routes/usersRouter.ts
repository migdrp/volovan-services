///<reference path="../types/types.d.ts" />

import express from 'express';
import { ExpressCallback } from '../utils';
import { validateRole, validateToken } from '../middlewares';
import { DELETEUsers, POSTUsers, PATCHUsers } from '../controllers/users';

const router = express.Router();

router.use(validateToken);
router.post(`/users`, validateRole(['Volovan Admin']), ExpressCallback(POSTUsers, 'createUser'));
router.post(`/users/find`, validateRole(['Volovan Admin', 'Scan Code']), ExpressCallback(POSTUsers, 'findUser'));
router.patch('/users', validateRole(['Volovan Admin']), ExpressCallback(PATCHUsers, 'editUser'));
router.delete(`/users`, validateRole(['Volovan Admin']), ExpressCallback(DELETEUsers, 'deleteUser'));
router.delete(`/users/roles`, validateRole(['Volovan Admin']), ExpressCallback(DELETEUsers, 'removeUserRoles'));

export default router;

