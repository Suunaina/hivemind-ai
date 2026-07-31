import { Router } from 'express';

const router = Router();

router.get('/stream/:taskId', (req, res) => {
  res.json({ message: `Agent stream endpoint ready for taskId ${req.params.taskId}` });
});

export default router;
