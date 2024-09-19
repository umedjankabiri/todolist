import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppWithRedux from "common/components/App/AppWithRedux.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithRedux />
  </StrictMode>,
)
