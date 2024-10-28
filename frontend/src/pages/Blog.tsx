import Loading from "../components/Loading";
import { useBlogId } from "../hooks/index";
import { useParams } from 'react-router-dom';
import FullBlog from '../components/FullBlog';
import Appbar from '../components/Appbar';

interface Blog {
  id: string;
  author: {
    name: string;
  };
  title: string;
  content: string;
}

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlogId({ id: id || "" }) as { loading: boolean, blog: Blog | null };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Appbar/>
      {blog ? (
        <FullBlog
        id={blog.id}
          authorName={blog.author.name}
          title={blog.title}
          content={blog.content}
        />
      ) : (
        <p>Blog not found.</p>
      )}
    </div>
  );
};

export default Blog;
