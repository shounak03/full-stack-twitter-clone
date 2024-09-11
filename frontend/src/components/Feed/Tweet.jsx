import React from 'react'
import Avatar from 'react-avatar'
import { FaRegCommentAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
const Tweet = () => {
    return (
        <div className='border-b border-gray-200'>
            <div >
                <div className='flex p-4'>
                    <Avatar src="https://imgs.search.brave.com/FpDI6Cfvv0p4gM1MNZaCo5IWtHUjwvoXgP61JTCbtIw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLW9mLWxl/dmktYWNrZXJtYW4t/djMxd3NiMmc1MWFq/ZnVnOC5qcGc" googleId="118096717852922241760" size="38" round={true} />

                    <div className='ml-3 w-full'>
                        <div className='flex items-center'>
                            <h1 className='font-bold'>Levi</h1>
                            <p className='text-gray-500 text-sm ml-1'> @LeviSan_3 . 52m </p>
                        </div>
                        <div>
                            <p>my 1st tweet</p>
                        </div>

                        <div className='flex justify-between my-3'>
                            <div className='flex  items-center'>
                                <div className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
                                    <FaRegCommentAlt size="15px"  />
                                </div>

                                <p className='text-gray-500 text-sm'> 2</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
                                    <AiOutlineRetweet />
                                </div>
                                <p className='text-gray-400 text-sm '> 2</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
                                    <CiHeart />
                                </div>
                                <p className='text-gray-500 text-sm '> 2</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
                                    <FaRegBookmark size={14} className='mr-3' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet