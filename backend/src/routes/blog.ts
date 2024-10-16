import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },    
  Variables:{
    userId:string,
}
 
  
//   status: (status: number) => void,
//   json: (data: any) => Promise<any>
}>();

// Initialize Prisma with Accelerate extension
const prisma = new PrismaClient().$extends(withAccelerate());


blogRouter.use('/*', async(c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    const user =await verify(authHeader , c.env.JWT_SECRET);
    
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);  // Set the userId in context
      await next();
    } else {
      return c.json({ message: "Unauthorized" }, 403);
    }
  } catch (error) {
    return c.json({ message: "Invalid token" }, 403);
  }
    next();
})

blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: body.userId // Replace with actual authorId
      }
    });

    return c.json({ success: true, blog }, 201); // Return the newly created blog post
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

blogRouter.put('/:id', async (c) => {
  const body = await c.req.json();
  const postId = c.req.param('id');
  
  try {
    const blog = await prisma.post.update({
      where: { id: postId },
      data: {
        title: body.title,
        content: body.content
      }
    });

    return c.json({ success: true, blog });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

blogRouter.get('/:id', async (c) => {
  const postId = c.req.param('id');

  try {
    const blog = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!blog) {
      return c.json({ success: false, error: "Blog post not found" }, 404);
    }

    return c.json({ success: true, blog });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

blogRouter.get('/bulk', async (c) => {
//   const { skip = 0, take = 10 } = c.req.query();

  try {
    const blogs = await prisma.post.findMany({
    //   skip: parseInt(skip as string),
    //   take: parseInt(take as string),
    });

    return c.json({ success: true, blogs });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

export default blogRouter;
