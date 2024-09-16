import React from 'react'
import CreatePost from './CreatePost'


const Feed = () => {



  
  return (
    <div className='w-[50%] border border-gray-200 overflow-y-auto scrollbar-hide'>
      <div>
        <CreatePost/>

        
      </div>
    </div>
  )
}

export default Feed