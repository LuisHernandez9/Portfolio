import React from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './portfolio.jsx'
import './index.css'    // tailwind (make sure this file exists)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
)
