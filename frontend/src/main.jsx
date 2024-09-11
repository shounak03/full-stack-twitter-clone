import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import './index.css'  // or whatever your CSS file is named
import Feed from './components/Feed/Feed'
import Profile from './components/Profile/Profile'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import App from './App'


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>
//       <Route path="" element={<Feed/>}/>
//       <Route path="profile" element={<Profile/>}/>
//     </Route>

//   )
// )

const router = createBrowserRouter([
      {
          path: '/',
          element: <App/>,
          children:[
              {
                  path:'/',
                  element:<Feed/>
              },
              {
                  path:'/Profile',
                  element:<Profile/>
              }
  
          ]
      },
      {
          path:'/login',
          element:<Login/>
      },
      {
        path:'/register',
        element:<SignUp/>
    }
    ])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router}/>

    
  </StrictMode>,
)
