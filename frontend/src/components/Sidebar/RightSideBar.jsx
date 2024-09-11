import React from 'react'
import { IoIosSearch } from "react-icons/io";
import Avatar from 'react-avatar';
const RightSideBar = () => {
  return (
    <div className='w-[25%]'>
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none '>
        <IoIosSearch size={20} />
        <input type="text" className='outline-none bg-transparent px-2' placeholder='Search' />
      </div>
      <div className='p-4 my-4 bg-gray-100 rounded-2xl'>
        <h1 className='font-bold text-lg my-3'>Who to follow</h1>
        <div className='flex items-center justify-between my-3'>
          <div className='flex w-full'>
            <div>
              <Avatar src="https://imgs.search.brave.com/FpDI6Cfvv0p4gM1MNZaCo5IWtHUjwvoXgP61JTCbtIw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLW9mLWxl/dmktYWNrZXJtYW4t/djMxd3NiMmc1MWFq/ZnVnOC5qcGc" googleId="118096717852922241760" size="42" round={true} />
            </div>
            <div className='ml-2'>
              <h1 className='font-bold '>Shounak</h1>
              <p className='text-sm'>@Goat</p>
            </div>
          </div>
          <div className=' mt-1 px-13 '>
            <button className='appearance-none bg-black border-2 border-[#1A1A1A] rounded-full box-border text-white cursor-pointer inline-block font-sans font-semibold text-[16px] w-[80px] h-[30px]'>
              follow</button>
          </div>
        </div>
        <div className='flex items-center justify-between my-3'>
          <div className='flex w-full'>
            <div>
              <Avatar src="https://imgs.search.brave.com/FpDI6Cfvv0p4gM1MNZaCo5IWtHUjwvoXgP61JTCbtIw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLW9mLWxl/dmktYWNrZXJtYW4t/djMxd3NiMmc1MWFq/ZnVnOC5qcGc" googleId="118096717852922241760" size="42" round={true} />
            </div>
            <div className='ml-2'>
              <h1 className='font-bold '>Shounak</h1>
              <p className='text-sm'>@Goat</p>
            </div>
          </div>
          <div className=' mt-1 px-13'>
            <button className='appearance-none bg-black border-2 border-[#1A1A1A] rounded-full box-border text-white cursor-pointer inline-block font-sans font-semibold text-[16px] w-[80px] h-[30px]'>
              follow</button>
          </div>
        </div>
        <div className='flex items-center justify-between my-3'>
          <div className='flex w-full'>
            <div>
              <Avatar src="https://imgs.search.brave.com/FpDI6Cfvv0p4gM1MNZaCo5IWtHUjwvoXgP61JTCbtIw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLW9mLWxl/dmktYWNrZXJtYW4t/djMxd3NiMmc1MWFq/ZnVnOC5qcGc" googleId="118096717852922241760" size="42" round={true} />
            </div>
            <div className='ml-2'>
              <h1 className='font-bold '>Shounak</h1>
              <p className='text-sm'>@Goat</p>
            </div>
          </div>
          <div className=' mt-1 px-13 '>
            <button className='appearance-none bg-black border-2 border-[#1A1A1A] rounded-full box-border text-white cursor-pointer inline-block font-sans font-semibold text-[16px] w-[80px] h-[30px]'>
              follow</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSideBar