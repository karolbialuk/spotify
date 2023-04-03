import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global-styles/style.scss'
import { Provider, provider } from 'react-redux'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
