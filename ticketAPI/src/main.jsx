import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LogIn from './register/logIn.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  chindren: [
    {
      path: '/login',
      element: <LogIn />,
    },
  ],
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
