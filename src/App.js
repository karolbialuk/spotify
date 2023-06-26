import { useEffect, useState } from 'react'

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
}

export default App
