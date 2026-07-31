import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Workspace endpoint ready for listing workspaces' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Workspace endpoint ready for creating workspace' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Workspace endpoint ready for fetching workspace ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Workspace endpoint ready for deleting workspace ${req.params.id}` });
});

export default router;
