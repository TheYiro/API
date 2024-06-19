import express from 'express';
import Category from '../models/Category.js';
import CategorySchema from '../schemas/CategorySchema.js';
import { authenticateJWT } from '../middleware/jwtMiddleware.js'; // Importamos el middleware JWT


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', authenticateJWT, async (req, res) => { // Protegemos la ruta con authenticateJWT
  try {
    const categoryData = CategorySchema.parse(req.body);
    const newCategory = await Category.create(categoryData);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.errors });
  }
});

export default router;
