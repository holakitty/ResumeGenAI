import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Hide static fallback landing page when React app mounts successfully
const staticLanding = document.getElementById('static-landing');
if (staticLanding) {
  staticLanding.style.display = 'none';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
