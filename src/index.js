import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UploadICS from './UploadICS.js'
import CalendarDisplay from './CalendarDisplay.js'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

localStorage.setItem("events", JSON.stringify([]));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <UploadICS />
    <CalendarDisplay />
  </React.StrictMode>
);

reportWebVitals();
