import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './router/AppRoutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
)
