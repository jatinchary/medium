import { Hono } from "hono";
import { z } from 'zod';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	},
  status: (status: number) => void;
  json: (data: any) => Promise<any>;
}>();


//////validation chesa

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'), 
  email: z.string().email('Invalid email address'), 
  password: z.string().min(8, 'Password must be at least 8 characters long'), 
});


const signinSchema = z.object({
  // name: z.string().min(1, 'Name is required'), 
  email: z.string().email('Invalid email address'), 
  password: z.string().min(8, 'Password must be at least 8 characters long'), 
});


userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = signupSchema.parse(await c.req.json());

  try {
  
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password, 
    },
  })
  
  const jwt = await sign({ userId: user.id }, c.env.JWT_SECRET); 
  
    return c.json(jwt);
  }
    catch(e) {
          c.status(403);
          return c.json({ error: "error while signing up" });
      }
  
  })
  
  userRouter.post('/signin', async(c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = signinSchema.parse(await c.req.json());
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      }
    });
  
    if (!user) {
      c.status(403);
      throw new Error("User not found");
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(jwt);
  } catch (error) {
    console.error('Error during authentication:', error);
    // c.status(403);
    return c.json({ error: "Invalid credentials" },403);
    // return c.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
  
  })