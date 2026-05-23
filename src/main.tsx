import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Privacy from './Privacy.tsx'
import Patterns from './Patterns.tsx'
import SystemDesign from './SystemDesign.tsx'

import { inject } from '@vercel/analytics'
inject()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/system-design" element={<SystemDesign />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)