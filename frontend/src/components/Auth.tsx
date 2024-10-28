
import { Link, useNavigate } from 'react-router-dom';
import InputForm from './InputForm';
import { useState } from 'react';
import axios from 'axios';



const Auth = () => {
  const  BACKEND_URL = "https://backend.charyjatin.workers.dev"
  const[postinputs , setPostinputs]= useState({
    name:'',
    email:'',
    password:' '
  })
  const navigate= useNavigate();
  
  async function sendReq() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postinputs);
      const jwt = response.data;
      localStorage.setItem('token', jwt);
      navigate('/blogs');
      
    } catch (e) {
      console.error("Signup failed:", e);
      alert("Something went wrong");
     
    }
  }
  
  
  
  return (
    <div className=' h-screen flex justify-center items-center'>
      <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full'>
        <h2 className='text-center text-2xl font-bold mb-4'>
          {/* {JSON.stringify(postinputs)} */}
          Create an Account
        </h2>
        <p className='text-slate-400 text-sm text-center mb-6'>
          Already have an account?{' '}
          <Link to="/signin" className='text-blue-500 underline'>
            Login
          </Link>
        </p>
        <InputForm lable='Name' placeholder='jatin' onChange={(e)=>{setPostinputs({
          ...postinputs,
          name: e.target.value
        })}}/>
        <InputForm lable='UserName' placeholder='jatin@gmail....' onChange={(e)=>{setPostinputs({
          ...postinputs,
          email: e.target.value
        })}}/>
        {/* console.log(setPostinputs); */}
        
        <InputForm lable='Password' placeholder='********' type='password' onChange={(e)=>{setPostinputs({
          ...postinputs,
          password: e.target.value
        })}}/>

<button onClick={sendReq} data-ripple-light="true" className="w-full bg-blue-400 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow items-center rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 mt-3"  type="button">
  Signup
</button>
      </div>
    </div>
  );
};

export default Auth;
