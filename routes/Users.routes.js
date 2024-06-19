import express from 'express';
import User from '../models/User.js'

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
      }
      await user.update(req.body);
      res.json(user);
  } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
