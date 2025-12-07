// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Inject Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// const preeti = document.createElement('style');
// preeti.innerHTML = `
//   @font-face {
//     font-family: 'Preeti';
//     src: url('/fonts/Preeti.ttf') format('truetype');
//     font-display: swap;
//   }
// `;
// document.head.appendChild(preeti);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);