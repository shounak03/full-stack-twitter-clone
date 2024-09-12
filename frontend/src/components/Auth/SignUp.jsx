import React, { useState } from 'react'
import logo from '../../../public/logo-twitter.png'
import { Link } from 'react-router-dom'
const SignUp = () => {

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const isError = false;
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div className=' hidden lg:flex '>
          <img src={logo} alt="" className='ml-5 ' width={'200px'} />
        </div>
        <div>
          <div className='my-5 w-full'>
          <img src={logo} className='w-24 lg:hidden fill-white' alt="" />
            <h1 className='font-bold text-6xl'>Join Today</h1>
          </div>
          <h1 className='mt-5 mb-4 text-4xl font-bold w-full'>SignUp</h1>
          <form action="" className='flex flex-col w-[80%]' onSubmit={handleSubmit}>
            
            <input type="text" placeholder='Email' className='border-gray-800 border outline-blue-500 px-3 py-1 rounded-full my-2 font-semibold'
              name='email'
              onChange={handleInputChange}
              value={formData.email} />
            <input type="text" placeholder='Username' className='border-gray-800 border outline-blue-500 px-3 py-1 rounded-full my-2 font-semibold' 
              name='username'
							onChange={handleInputChange}
							value={formData.username}/>
            <input type="text" placeholder='Fullname' className='border-gray-800 border outline-blue-500 px-3 py-1 rounded-full my-2 font-semibold' 
              name='fullname'
							onChange={handleInputChange}
							value={formData.fullname}/>
            <input type="password" placeholder='Password' className='border-gray-800 border outline-blue-500 px-3 py-1 rounded-full my-2 font-semibold' 
              name='password'
							onChange={handleInputChange}
							value={formData.password}/>
            <button className='appearance-none bg-black border-2 mt-2 border-[#1A1A1A] rounded-full box-border text-white cursor-pointer inline-block font-sans font-semibold text-[16px] w-[50%] h-[40px]'>
              SignUp</button>
            {isError && <p className='text-red-500 mt-3'>Something went wrong</p>}
            <div className='my-4'>
              <h1>
                Already have an account? <Link to="/login" className='font-bold text-gray-1000 underline'>Login</Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp