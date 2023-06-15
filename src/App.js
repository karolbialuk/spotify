import { React, useEffect, useState } from 'react'
import {
  LoginPage,
  HomePage,
  PlaylistPage,
  FavouritePage,
  SearchPage,
  CategoryPage,
  AuthorPage,
} from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LeftSidebar, Navbar, Player } from './components'

import './index.scss'

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

const App = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = ParamsSpotifyAuth(
        window.location.hash,
      )
      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('expiresIn', expires_in)
      localStorage.setItem('tokenType', token_type)
    }
  }, [])

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'))
  }, [window.location.hash])

  return (
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
  )
}

export default App
