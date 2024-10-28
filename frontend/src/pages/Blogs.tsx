// import App from '@/App'?
import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import { useBlog } from '../hooks/index'
import Loading from '../components/Loading'

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

const Blogs = () => {
  const {loading, blogs} = useBlog<Blog[]>();
  
  if (loading) {
    return <Loading/>;
  }

  return (
    <div>
      <Appbar/>
      {(blogs ?? []).map(blog => <BlogCard
        authorName={blog.author.name}
        id={blog.id}
        title={blog.title}
        content={blog.content}
        date={"12/4/24"}
      />)}
    </div>
  )
}

export default Blogs
