import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'



const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	},
  status: (status: number) => void;
  json: (data: any) => Promise<any>;
}>();
app.use('/api/*', cors())

app.get('/', (c) => c.text('Hono!'));

app.route('/api/v1/user',userRouter );
app.route('/api/v1/blog', blogRouter);



export default app
