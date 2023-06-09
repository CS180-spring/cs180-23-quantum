import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './components/ThemeContext'
import { AuthProvider } from './components/AuthContext'
import Background from './components/Background'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <ThemeProvider>
    <AuthProvider>
        <Background>
            <App />
        </Background>
    </AuthProvider>
    </ThemeProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
