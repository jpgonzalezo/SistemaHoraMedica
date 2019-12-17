import { Router } from 'express';
const router = Router();
export default router;
import { getReservesUser, createReserve, getReserves } from '../controllers/reserve.controller';

router.post('/', createReserve );
router.get('/', getReserves);
router.get('/:userID', getReservesUser );