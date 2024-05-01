import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import LogIn from './register/logIn.jsx';
import MainPage from './pages/mainPage/mainPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/mainPage',
        element: <MainPage />,
      },
    ],
  },
  {
    path: '/logIn',
    element: <LogIn />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
