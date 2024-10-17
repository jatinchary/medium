import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Blog from './pages/Blog'
import Signup from './pages/Signup'
import { Signin } from './pages/Signin'



const App = () => {
  return (<>
  
    <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
        </>
  )
}

export default App