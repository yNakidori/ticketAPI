// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainPage from './pages/mainPage';
import LogIn from './register/logIn';
import SignIn from './register/signIn';
import MenuPage from './pages/mainPage/menuPage';
import TeamsPage from './components/configPage_Components/teamsPage';
import ProjectsPage from './components/configPage_Components/projectsPage';

ReactDOM.render(
    <React.StrictMode>
        <App />
        <MainPage />
        <LogIn />
        <SignIn />
        <MenuPage />
        <TeamsPage />
        <ProjectsPage />
    </React.StrictMode>,
    document.getElementById('root')
);
