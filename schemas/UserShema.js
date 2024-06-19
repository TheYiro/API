import z from 'zod';

const UserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
});

export default UserSchema;