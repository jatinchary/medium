import React from 'react'
import Qout from '../components/Qout'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import InputForm from '../components/InputForm'


const Signin = () => {
  const[postinputs , setPostinputs]= useState({
    username:'',
    password:' '
  })
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div><div className=' h-screen flex justify-center items-center'>
      <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full'>
        <h2 className='text-center text-2xl font-bold mb-4'>
         {/* {JSON.stringify(postinputs)}  */}
          Create an Account
        </h2>
        <p className='text-slate-400 text-sm text-center mb-6'>
          Dont have an account?{' '}
          <Link to="/signup" className='text-blue-500 underline'>
            Create account
          </Link>
        </p>
       
        <InputForm lable='UserName' placeholder='jatin@gmail....' onChange={(e)=>{setPostinputs({
          ...postinputs,
          username: e.target.value
        })}}/>
        {/* console.log(setPostinputs); */}
        
        <InputForm lable='Password' placeholder='jatin' type='password' onChange={(e)=>{setPostinputs({
          ...postinputs,
          password: e.target.value
        })}}/>

<button data-ripple-light="true" className="w-full bg-blue-400 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow items-center rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 mt-3"  type="button">
  Signup
</button>
      </div>
    </div></div>
      <div className=" invisible md:visible">
    <Qout/>
    </div>
    </div>
    </>
  )
}

export default Signin