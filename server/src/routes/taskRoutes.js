import { Router } from 'express';
import { createTask, getUserTasks, getTaskById, askMentor, updateTaskProgress } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Protect all task endpoints with JWT middleware
router.use(protect);

router.post('/', createTask);
router.get('/', getUserTasks);
router.get('/:id', getTaskById);
router.post('/:id/mentor', askMentor);
router.patch('/:id/progress', updateTaskProgress);

export default router;
