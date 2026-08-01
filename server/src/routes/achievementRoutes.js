import { Router } from 'express';
import { getAchievements, unlockAchievement } from '../controllers/achievementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.get('/', getAchievements);
router.post('/unlock', unlockAchievement);

export default router;
