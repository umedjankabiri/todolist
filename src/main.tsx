import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppWithRedux from "App/AppWithRedux.tsx";
import {Provider} from "react-redux";
import {store} from "App/store.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </StrictMode>,
)
