// import App from '@/App'?
import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import { useBlog } from '../hooks/index'
import Loading from '../components/Loading'

const Blogs = () => {
  // blogs= useBlog();
  const {loading , blogs} =useBlog();
  if (loading) {
    return (
        <Loading/>
    );
}

  return (
    <div>
      <Appbar/>
      {blogs.map(blog=><BlogCard  authorName = {blog.author.name}
      id={blog.id}
      title = {blog.title}
      content = {blog.content}
      date = {"12/4/24"}
       />)}
    
    </div>
  )
}

export default Blogs