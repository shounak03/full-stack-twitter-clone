import React from 'react'
import logo from '../../../public/logo-twitter.png'
import { MdHome } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import { GrLogout } from "react-icons/gr";
import { MdNotificationsActive } from "react-icons/md"
import { Link } from 'react-router-dom';

import Avatar from 'react-avatar';

const LeftSideBar = () => {

    const user = {
        fullname: "Levi San",
        username: 'Goat',
        profileImg:'./public/boy3.png'
    }

  return (
    <div className='w-[20%]'>
        <Link to="/">
            <img className="ml-5" width="90px" src={logo} alt="logo" />
        </Link >
        <div className="my-4">
            <div className='flex items-center mx-2 px-4 py-2 hover:bg-gray-200
                            hover:cursor-pointer rounded-full'>
                <MdHome size="25px"/>
                <h1 className='font-bold ml-2 text-lg'>Home</h1>
            </div>
            <div className='flex items-center mx-2 px-4 py-2 hover:bg-gray-200
                            hover:cursor-pointer rounded-full'>
                <MdOutlineExplore size="25px"/>
                <h1 className='font-bold ml-2 text-lg'>Explore</h1>
            </div>
            <Link to='/notification' className='flex items-center mx-2 px-4 py-2 hover:bg-gray-200
                            hover:cursor-pointer rounded-full'>
                <MdNotificationsActive size="25px"/>
                <h1 className='font-bold ml-2 text-lg'>Notification</h1>
            </Link>
            <Link to="/profile" className='flex items-center mx-2 px-4 py-2 hover:bg-gray-200
                            hover:cursor-pointer rounded-full'>
                <FaRegUser size="25px"/>
                <h1 className='font-bold ml-2 text-lg'>Profile</h1>
            </Link>
            <div className='flex items-center mx-2 px-4 py-2 hover:bg-gray-200
                            hover:cursor-pointer rounded-full'>
                <IoMdBookmark size="27px"/>
                <h1 className='font-bold ml-2 text-lg'>Bookmarks</h1>
            </div>
            <Link to="/login" className='flex items-center mx-2 px-4 py-2 hover:bg-gray-200
                            hover:cursor-pointer rounded-full'>
                <GrLogout size="25px"/>
                <h1 className='font-bold ml-2 text-lg'>Log-Out</h1>
            </Link>
            <button class="appearance-none bg-black border-2 border-[#1A1A1A] rounded-[15px] box-border text-white cursor-pointer inline-block font-sans font-semibold text-[16px] leading-normal mt-4 m-0 min-h-[60px] p-[16px_24px] text-center no-underline transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] select-none w-full hover:shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:-translate-y-2 active:shadow-none active:translate-y-0 disabled:pointer-events-none"
  role="button">Tweet</button>
            
            {user && (
                <div className="fixed bottom-5 left-11 w-[21%] px-4 py-2 z-50">
                <Link
                  to='/profile' 
                  className='flex items-center gap-2 bg-white hover:bg-gray-100 transition-all duration-300 py-2 px-3 rounded-full'
                >
                  <div className='avatar hidden md:inline-flex'>
                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                      <img 
                        src={user?.profileImg || "/avatar-placeholder.png"} 
                        alt={user.fullname}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className='flex flex-col md:flex-row md:items-center'>
                    <div className='hidden md:block'>
                      <p className='font-bold text-sm truncate max-w-[150px]'>{user.fullname}</p>
                      <p className='text-sm text-gray-600'>@{user.username}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
        </div>
    </div>
  )
}

export default LeftSideBar