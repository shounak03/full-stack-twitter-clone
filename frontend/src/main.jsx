// import React from 'react'

// import Feed from './components/Feed/Feed'
// import Profile from './components/Profile/Profile'
// import Notification from './components/notifications/Notification'
// import Login from './components/Auth/Login'
// import SignUp from './components/Auth/SignUp'
// import App from './App'

// import { createRoot } from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// const queryClient = new QueryClient()



// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         children: [
//             {
//                 path: '/',
//                 element: <Feed />
//             },
//             {
//                 path: '/profile',
//                 element: <Profile />
//             },
//             {
//                 path:'/notification',
//                 element:<Notification/>
//             },
//         ]
//     },
//     {
//         path: '/login',
//         element: <Login />
//     },
//     {
//         path: '/register',
//         element: <SignUp />
//     }
// ])

// // Check if the root element exists
// const rootElement = document.getElementById('root')
// if (!rootElement) throw new Error('Failed to find the root element')

// // Check if a root already exists
// const existingRoot = rootElement._reactRootContainer
// if (existingRoot) {
//     // If a root exists, use it to render
//     existingRoot.render(
//         <React.StrictMode>
//             <QueryClientProvider client={queryClient}>
//                 <RouterProvider router={router} />
//                 <Toaster />
//             </QueryClientProvider>
//         </React.StrictMode>
//     )
// } else {
//     // If no root exists, create a new one
//     const root = createRoot(rootElement)
//     root.render(
//         <React.StrictMode>
//             <QueryClientProvider client={queryClient}>
//                 <RouterProvider router={router} />
//             </QueryClientProvider>
//         </React.StrictMode>
//     )
// }

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);