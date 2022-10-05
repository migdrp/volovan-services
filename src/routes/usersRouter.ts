import express from 'express';
import { ExpressCallback } from '../utils';
import { validateToken } from '../middlewares';
import { DELETEUsers, POSTUsers, PATCHUsers } from '../controllers/users';

const router = express.Router();

router.use(validateToken);
router.post(`/users`, ExpressCallback(POSTUsers, 'createUser'));
router.post(`/users/find`, ExpressCallback(POSTUsers, 'findUser'));
router.patch('/users', ExpressCallback(PATCHUsers, 'editUser'));
router.delete(`/users`, ExpressCallback(DELETEUsers, 'deleteUser'));
router.delete(`/users/roles`, ExpressCallback(DELETEUsers, 'removeUserRoles'));

export default router;

