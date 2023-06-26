import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global-styles/style.scss'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  LoginPage,
  HomePage,
  PlaylistPage,
  FavouritePage,
  SearchPage,
  CategoryPage,
  AuthorPage,
} from './pages'

const ParamsSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1)
  const paramsInUrl = stringAfterHashtag.split('&')
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split('=')
    accumulater[key] = value
    return accumulater
  }, {})

  return paramsSplitUp
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={<HomePage token={localStorage.getItem('accessToken')} />}
        />
        <Route
          path="/playlist/:id"
          element={<PlaylistPage token={localStorage.getItem('accessToken')} />}
        />
        <Route
          path="/album/:id"
          element={<PlaylistPage token={localStorage.getItem('accessToken')} />}
        />
        <Route
          path="/favourite"
          element={
            <FavouritePage token={localStorage.getItem('accessToken')} />
          }
        />
        <Route
          path="/search"
          element={<SearchPage token={localStorage.getItem('accessToken')} />}
        />
        <Route
          path="/category/:id"
          element={<CategoryPage token={localStorage.getItem('accessToken')} />}
        />
        <Route
          path="/author/:id"
          element={<AuthorPage token={localStorage.getItem('accessToken')} />}
        />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
)
