// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainPage from './pages/mainPage';
import LogIn from './register/logIn';
import MenuPage from './pages/mainPage/menuPage';

ReactDOM.render(
    <React.StrictMode>
        <App />
        <MainPage />
        <LogIn />
        <MenuPage />
    </React.StrictMode>,
    document.getElementById('root')
);
