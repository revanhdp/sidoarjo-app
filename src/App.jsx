import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recipe from './pages/Recipe'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/recipe' element={<Recipe/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
