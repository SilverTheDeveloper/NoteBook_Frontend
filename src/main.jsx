import React    from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'

// Separated CSS — each file owns its own component's styles
import './styles/global.css'
import './styles/navbar.css'
import './styles/auth.css'
import './styles/noteCard.css'
import './styles/dashboard.css'
import './styles/modal.css'
import './styles/utilities.css'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
