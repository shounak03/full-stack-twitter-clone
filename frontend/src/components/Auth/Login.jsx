import React from 'react'
import logo from '../../../public/logo-twitter.png'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img src={logo} alt="" className='ml-5' width={'200px'}/>
        </div>
        <div>
          <div className='my-5 w-full'>
            <h1 className='font-bold text-6xl'> Happening Now</h1>
          </div>
          <h1 className='mt-5 mb-4 text-4xl font-bold w-full'>Login</h1>
          <form action="" className='flex flex-col w-[80%]'>
            <input type="text" placeholder='Username or Email' className='border-gray-800 border outline-blue-500 px-3 py-1 rounded-full my-2 font-semibold'  />
            <input type="password" placeholder='Password' className='border-gray-800 border outline-blue-500 px-3 py-1 rounded-full my-2 font-semibold'  />
            <button className='appearance-none bg-black border-2 mt-2 border-[#1A1A1A] rounded-full box-border text-white cursor-pointer inline-block font-sans font-semibold text-[16px] w-[50%] h-[40px]'>
                        Login</button>
            <div className='my-4'>
              <h1>
                Don't have an account? <Link to="/register" className='font-bold text-gray-1000 underline'>Register</Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login