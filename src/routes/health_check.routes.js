import { Router } from 'express';
import { health_check } from '../controller/health_check.controller.js';

const router = Router();

router.route('/').get(health_check);

export default router;