import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { initTelegram } from './telegram/webapp'
import { App } from './App'
import './index.css'

initTelegram()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
