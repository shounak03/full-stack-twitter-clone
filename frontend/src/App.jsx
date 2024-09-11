import React from 'react'
import LeftSideBar from './components/Sidebar/LeftSideBar'
import RightSideBar from './components/Sidebar/RightSideBar'
// import Body from './Body'
import './index.css'  // or whatever your CSS file is named
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='flex justify-between w-[90%] mx-auto mt-2'>
        <LeftSideBar/>
        <Outlet/>
        <RightSideBar/>
    </div>
  )
}

export default App