import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppWithReducers from "common/components/App/AppWithReducers.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithReducers />
  </StrictMode>,
)
