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

}>();

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
  console.log("sdfghj");
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  const authorId = c.get("userId");
  // console.log("sdfghj");
  

  
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId // Replace with actual authorId
      }
    });

    return c.json({ success: true, blog }, 201); // Return the newly created blog post
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

blogRouter.put('/', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  const authorId = c.get("userId");

  try {
    
    const userId = c.get('userId');
    if (!userId) {
      return c.text('User not authenticated', 401);
    }
    const body = await c.req.json();
    if (!body.id || !body.title || !body.content) {
      return c.text('Missing required fields', 400); 
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({sucess:true ,updatedPost}, 200 ,);
  } catch (error) {
    console.error('Error updating post:', error);
    return c.text('Failed to update post', 500); // Internal server error for any issues
  }
});


blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blogs = await prisma.post.findMany();

    return c.json({ success: true, blogs });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
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




export default blogRouter;
