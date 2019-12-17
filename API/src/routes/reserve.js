import { Router } from 'express';
const router = Router();
export default router;
import { getReservesUser, createReserve, getReserves, deleteReserve, updateReserve } from '../controllers/reserve.controller';

router.post('/', createReserve );
router.get('/', getReserves);
router.delete('/:reserveID', deleteReserve);
router.put('/:reserveID', updateReserve);
router.get('/user/:userid', getReservesUser );