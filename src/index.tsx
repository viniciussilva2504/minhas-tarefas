import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import reportWebVitals from './reportWebVitals'

// Captura erros globais (incluindo useEffect) que não são apanhados pelo ErrorBoundary
window.addEventListener('error', (event) => {
  const div = document.createElement('div')
  div.style.cssText =
    'position:fixed;top:0;left:0;right:0;background:#c0392b;color:#fff;padding:16px;z-index:99999;font:12px monospace;white-space:pre-wrap;word-break:break-all;max-height:50vh;overflow:auto'
  div.textContent = `[JS ERROR]\n${event.message}\n\n${
    event.error?.stack ?? ''
  }`
  document.body.appendChild(div)
})

window.addEventListener('unhandledrejection', (event) => {
  const div = document.createElement('div')
  div.style.cssText =
    'position:fixed;top:0;left:0;right:0;background:#e67e22;color:#000;padding:16px;z-index:99999;font:12px monospace;white-space:pre-wrap;word-break:break-all;max-height:50vh;overflow:auto'
  div.textContent = `[PROMISE REJECTION]\n${
    event.reason?.message ?? event.reason
  }\n\n${event.reason?.stack ?? ''}`
  document.body.appendChild(div)
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportWebVitals()

export {}
