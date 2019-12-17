import { Router } from 'express';
const router = Router();
import { createUser, getUsers, getUser, deleteUser, updateUser } from '../controllers/user.controller'; // /api/users/

router.post('/', createUser);
router.get('/', getUsers); // /api/users/:userID

router.get('/:userID', getUser);
router.delete('/:userID', deleteUser);
router.put('/:userID', updateUser);
export default router;