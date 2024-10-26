import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HashRouter } from 'react-router-dom'; // Import HashRouter for routing

createRoot(document.getElementById('root')).render(
  <HashRouter>  {/* Wrap the App with HashRouter for handling routes */}
    <StrictMode>
      <App />
    </StrictMode>
  </HashRouter>,
);
