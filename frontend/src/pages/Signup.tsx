// import React from 'react'
import Auth from "../components/Auth"
import Qout from "../components/Qout"
const Signup = () => {
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Auth/>
      <div className=" invisible md:visible">
    <Qout/>
    </div>
    </div>
    </>
  )
}

export default Signup