import React from 'react'
import { LoginPage, HomePage, PlaylistPage } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
