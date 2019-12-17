import { Router } from 'express';
const router = Router();

import { login } from '../controllers/login.controller';

// /api/login/
router.post('/', login );

export default router;