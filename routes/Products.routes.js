import express from 'express';
import Product from '../models/Product.js'
import ProductSchema from '../schemas/ProductShema.js';
import { authenticateJWT } from '../middleware/jwtMiddleware.js'; 
 
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', authenticateJWT, async (req, res) => { 
  try {
    const productData = ProductSchema.parse(req.body);
    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.errors });
  }
});

router.put('/', authenticateJWT, async (req, res) =>{
  try {
    const productData = ProductSchema.parse(req.body);
    const updatedProduct = await Product.update(productData, {
      where: { id: req.body.id },
      });
      res.json(updatedProduct);
  } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.errors });
  }
});

router.delete('/', authenticateJWT, async (req, res) => {
  try {
    const id = req.query.id;
    await Product.destroy({ where: { id } });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error deleting product' });
  }
});

export default router;
