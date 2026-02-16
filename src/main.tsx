import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className="dark bg-[#0a0e17] min-h-screen text-gray-200">
      <App />
    </main>
  </React.StrictMode>
)
