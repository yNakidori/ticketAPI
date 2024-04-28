// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainPage from './pages/mainPage';
import LogIn from './register/logIn';

ReactDOM.render(
    <React.StrictMode>
        <App />
        <MainPage />
        <LogIn />
    </React.StrictMode>,
    document.getElementById('root')
);
