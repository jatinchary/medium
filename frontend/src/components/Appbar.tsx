import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const Appbar = () => {
  return (
    <div className='flex justify-between px-10 mt-3'>
        <div className=' font-bold text-2xl'>Tell Story</div>
        <div>
<Link to="/publish">
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded-full">
  New Blog
</button>
</Link>
            < Avatar name="j" />
        </div>
    </div>
  )
}

export default Appbar
