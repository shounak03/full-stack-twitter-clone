import React from 'react'
import LeftSideBar from './components/Sidebar/LeftSideBar'
import RightSideBar from './components/Sidebar/RightSideBar'

import './index.css'  
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Notification from './components/notifications/Notification'
import Profile from './components/Profile/Profile'
import { useQuery } from '@tanstack/react-query'
import Feed from './components/Feed/Feed'
import LoadingSpinner from './components/common/LoadingSpinner'


const App = () => {

  const { data: authUser, isLoading } = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				console.log("authUser is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});
  if(isLoading){
    return(
      <div className='flex h-screen justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>

    )
  }
  return (
		<div className='flex justify-between w-[90%] mx-auto mt-2'>
			{/* Common component, bc it's not wrapped with Routes */}
			{authUser && <LeftSideBar />}
			<Routes>
				<Route path='/' element={authUser ? <Feed /> : <Navigate to='/login' />} />
				<Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
				<Route path='/register' element={!authUser ? <SignUp /> : <Navigate to='/' />} />
				<Route path='/notifications' element={authUser ? <Notification /> : <Navigate to='/login' />} />
				<Route path='/profile/:username' element={authUser ? <Profile /> : <Navigate to='/login' />} />
			</Routes>
			{authUser && <RightSideBar />}
			<Toaster />
		</div>
	);
}

export default App