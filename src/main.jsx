import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ── Error boundary — shows a friendly error instead of blank white screen ─────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('[FinTax LK] React error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return React.createElement('div', {
        style: {
          minHeight: '100vh', background: '#060d1a',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'sans-serif', padding: '24px', textAlign: 'center'
        }
      },
        React.createElement('div', { style: { fontSize: 48, marginBottom: 16 } }, '⚠️'),
        React.createElement('h2', { style: { color: '#f5d060', marginBottom: 8 } }, 'FinTax LK — Loading Error'),
        React.createElement('p', { style: { color: '#94a3b8', marginBottom: 24, maxWidth: 320 } },
          'Something went wrong. Please clear your browser cache and refresh.'),
        React.createElement('button', {
          onClick: () => {
            if ('caches' in window) {
              caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
                .then(() => window.location.reload())
            } else {
              window.location.reload()
            }
          },
          style: {
            padding: '12px 24px', background: '#b8960c', border: 'none',
            borderRadius: 10, color: '#111', fontWeight: 800, fontSize: 14,
            cursor: 'pointer'
          }
        }, '🔄 Clear Cache & Reload'),
        React.createElement('p', { style: { color: '#334155', fontSize: 11, marginTop: 16 } },
          'FinTax LK · GDP Consultants — Chartered Accountants')
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(ErrorBoundary, null,
    React.createElement(React.StrictMode, null,
      React.createElement(App)
    )
  )
)
