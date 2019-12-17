import { Router } from 'express';
const router = Router();
export default router;
import { getReservesUser, createReserve, getReserves, deleteReserve } from '../controllers/reserve.controller';

router.post('/', createReserve );
router.get('/', getReserves);
router.delete('/:reserveID', deleteReserve);
router.get('/user/:userID', getReservesUser );