import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

// Initialize AOS globally
AOS.init({
  duration: 1000,              // Animation duration (1 second)
  easing: 'ease-in-out',       // Smooth easing
  once: false,                 // Animate every time element comes into view
  mirror: true,                // Animate on scroll up too
  offset: 100,                 // Start animation 100px before element enters viewport
  delay: 0,                    // No delay by default
  anchorPlacement: 'top-bottom', // When to trigger animation
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
