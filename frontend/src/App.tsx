
import { Route, Routes } from 'react-router-dom'
import Blog from './pages/Blog'
import Signup from './pages/Signup'
import Signin  from './pages/Signin'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'



const App = () => {
  return (<>
  
    <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
        </>
  )
}

export default App