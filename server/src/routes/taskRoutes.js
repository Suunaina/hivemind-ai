import { Router } from 'express';
import { createTask, getUserTasks, getTaskById } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Protect all task endpoints with JWT middleware
router.use(protect);

router.post('/', createTask);
router.get('/', getUserTasks);
router.get('/:id', getTaskById);

export default router;
