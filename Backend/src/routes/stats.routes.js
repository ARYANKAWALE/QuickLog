import { Router } from 'express';
import { getStats } from '../controllers/stats.controllers.js';

const router = Router();

router.route('/').get(getStats);

export default router;
