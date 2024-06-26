import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import LogIn from './register/logIn.jsx';
import SignIn from './register/signIn.jsx';
import MainPage from './pages/mainPage/mainPage.jsx';
import MenuPage from './pages/menuPage/menuPage.jsx';
import FlowPage from './pages/flowPage/flowPage.jsx';
import ConfigPage from './pages/configPage/configPage.jsx';
import ChatPage from './pages/chatsPage/chatPage.jsx';
import HomePage from './pages/homePage/homePage.jsx';
import TeamsPage from './components/configPage_Components/teamsPage.jsx';
import ProjectsPage from './components/configPage_Components/projectsPage.jsx';

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
  {
    path: '/signIn',
    element: <SignIn />,
  },
  {
    path: '/menuPage',
    element: <MenuPage />,
  },
  {
    path: '/flowPage',
    element: <FlowPage />,
  },
  {
    path: '/configPage',
    element: <ConfigPage />,
  },
  {
    path: '/chatPage',
    element: <ChatPage />,
  },
  {
    path: '/homePage',
    element: <HomePage />,
  },
  {
    path: '/teamsPage',
    element: <TeamsPage />,
  },
  {
    path: '/projectsPage',
    element: <ProjectsPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
