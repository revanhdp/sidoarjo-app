import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Recipe from './pages/Recipe'
import Marketplace from './pages/Marketplace'
import Article from './pages/Article'
import Login from './pages/auth/Login'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/recipe' element={<Recipe/>} />
        <Route path='/article' element={<Article/>} />
        <Route path='/marketplace' element={<Marketplace/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
