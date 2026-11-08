import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/App.tsx'
// import TestApp from './TestApp/TestApp.tsx'
import Invastments from './Investments/Investments.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <TestApp /> */}
    <Invastments />
  </StrictMode>,
)
