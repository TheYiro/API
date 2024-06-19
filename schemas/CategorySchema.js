import z from 'zod';

const CategorySchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000).optional(),
});

export default CategorySchema;
