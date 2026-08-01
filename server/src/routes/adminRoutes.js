import { Router } from 'express';
import {
  getAdminStats,
  getAdminUsers,
  getAdminUserById,
  getAdminAnalytics
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

// Protect all admin endpoints with JWT + Admin role check
router.use(protect);
router.use(admin);

router.get('/stats', getAdminStats);
router.get('/users', getAdminUsers);
router.get('/users/:userId', getAdminUserById);
router.get('/analytics', getAdminAnalytics);

export default router;
