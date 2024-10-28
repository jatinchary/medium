import  { useState } from 'react';
import Qout from '../components/Qout';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import axios from 'axios';


import AppBar2 from '../components/AppBar2';

const Signin = () => {
  const  BACKEND_URL = "https://backend.charyjatin.workers.dev"
  const [postinputs, setPostinputs] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  async function sendReq() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postinputs);
      const jwt = response.data;
      localStorage.setItem('token', jwt);
      navigate('/blogs');
    } catch (e) {
      console.error('Signup failed:', e);
      alert('Something went wrong');
    }
  }

  return (
    <>
    <AppBar2/>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <h2 className="text-center text-2xl font-bold mb-4">Create an Account</h2>
            <p className="text-slate-400 text-sm text-center mb-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 underline">
                Create account
              </Link>
            </p>
            
            <InputForm
              lable="Email"
              placeholder="jatin@gmail.com"
              onChange={(e) => setPostinputs({ ...postinputs, email: e.target.value })}
            />
            
            <InputForm
              lable="Password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPostinputs({ ...postinputs, password: e.target.value })}
            />
            
            <button
              onClick={sendReq}
              className="w-full bg-blue-400 text-white text-sm border border-transparent rounded-md py-2 px-4 transition duration-300 shadow-sm hover:bg-blue-500 focus:bg-blue-600"
            >
              Signup
            </button>
          </div>
        </div>
        
        <div className="hidden md:block">
          <Qout />
        </div>
      </div>
    </>
  );
};

export default Signin;
