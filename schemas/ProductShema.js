import z from 'zod';

const ProductSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000).optional(),
  price: z.number().min(0.01),
  stock: z.number().min(0).int(),
  image_url: z.string().url().optional(),
  category_id: z.number().int(),
});

export default ProductSchema;
