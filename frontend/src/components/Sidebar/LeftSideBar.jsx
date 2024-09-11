import React from 'react'
import logo from '../../../public/logo-twitter.png'
import { MdHome } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import { GrLogout } from "react-icons/gr";
import { MdNotificationsActive } from "react-icons/md"
import { Link } from 'react-router-dom';

const LeftSideBar = () => {
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
            <div className='flex items-center mx-2 px-4 py-2 hover:bg-gray-200
                            hover:cursor-pointer rounded-full'>
                <MdNotificationsActive size="25px"/>
                <h1 className='font-bold ml-2 text-lg'>Notification</h1>
            </div>
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
            
        </div>
    </div>
  )
}

export default LeftSideBar