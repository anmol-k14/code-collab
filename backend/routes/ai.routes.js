import { Router } from 'express';
import * as aiController from '../controllers/ai.controller.js';
const router = Router();

router.get('/get-result', aiController.getResult)
router.post('/chatai', aiController.chatAI)

export default router;