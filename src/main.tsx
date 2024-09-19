import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppWithRedux from "App/AppWithRedux.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithRedux />
  </StrictMode>,
)
