import React from 'react'
import Avatar from 'react-avatar'
import { FaImages } from "react-icons/fa6";

const CreatePost = () => {
  return (
    <div className='w-[100%]'>
        <div >
            <div className='flex justify-around items-center border-b border-gray-200'>
                <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'>
                    <h1 className='font-semibold text-gray-600 cursor-pointer text-lg'>For You</h1>
                </div>
                <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'>
                    <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                </div>
            </div>
            <div >
                <div className='flex items-center m-4' >
                    <div >
                        <Avatar src="https://imgs.search.brave.com/FpDI6Cfvv0p4gM1MNZaCo5IWtHUjwvoXgP61JTCbtIw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLW9mLWxl/dmktYWNrZXJtYW4t/djMxd3NiMmc1MWFq/ZnVnOC5qcGc" googleId="118096717852922241760" size="38" round={true} />
                    </div>
                    <input className="w-full outline-none border-none text-lg ml-4" type="text" placeholder='What is happening'/>
                </div>
                <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                    <div>
                        <FaImages size="25px"/>
                    </div>
                    <button className='appearance-none bg-black border-2 border-[#1A1A1A] rounded-full box-border text-white cursor-pointer inline-block font-sans font-semibold text-[16px] w-[80px] h-[30px]'>
                        Post</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreatePost