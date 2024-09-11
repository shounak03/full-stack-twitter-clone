import React from 'react'
import Avatar from 'react-avatar';
import { IoMdArrowBack } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className='w-[50%] border border-gray-200'>
      <div>
         <div className='flex items-center py-2 '>
          <Link to='/' className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
            <IoMdArrowBack size="24px"/>
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg'>Levi</h1>
            <p className='text-gray-500 text-sm'>124 Post</p>
          </div>
         </div>
         <img src="https://pbs.twimg.com/profile_banners/1424624896806555649/1719689085/1500x500" alt="cover-img"/>
         <div className='absolute top-56 border-4 border-white rounded-full ml-4'>
            <Avatar src="https://pbs.twimg.com/profile_images/1807128314529898496/oH9YW1Ao_400x400.jpg" size='120px' round={true} />
         </div>
        <div className='text-right m-4'>
          <button className='px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-300'>Edit Profile</button>
        </div>
        <div className='m-4'>
          <h1 className='font-bold text-xl'>Levi</h1>
          <p className='text-sm text-gray-500'>@Goat</p>
        </div>
        <div className='m-4'>
          <p>I might be the Goat....</p>
        </div>
        <div className='m-4 flex items-center justify-start' >
          <SlCalender/>
          <p className='pl-2 text-gray-600'>Joined August 2021</p>
        </div>
        <div className='m-4 flex items-center justify-start'>
          <p className='font-bold '>112</p>
          <h1 className='pl-1 text-gray-500'>Following</h1>  
          <div className='flex items-center justify-start'> 
            <p className='font-bold ml-6'>2M</p>
            <h1 className='pl-1 text-gray-500'>Followers</h1>  
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Profile