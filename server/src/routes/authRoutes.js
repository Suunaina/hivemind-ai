import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Auth endpoint ready for registration implementation' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Auth endpoint ready for login implementation' });
});

router.get('/me', (req, res) => {
  res.json({ message: 'Auth endpoint ready for profile fetch' });
});

export default router;
