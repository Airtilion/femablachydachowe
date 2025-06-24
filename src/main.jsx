import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainSite from './pages/MainSite'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainSite/>
  </StrictMode>,
)
