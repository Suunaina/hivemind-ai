import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.json({ message: 'Task endpoint ready for creation' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Task endpoint ready for fetching task ${req.params.id}` });
});

export default router;
