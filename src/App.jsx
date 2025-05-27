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
import DetailArticle from './pages/ArticleDetail'
import Register from './pages/auth/Register'
import Profile from './pages/user/Profile'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/detail-article' element={<DetailArticle/>} />
        <Route path='/recipe' element={<Recipe/>} />
        <Route path='/article' element={<Article/>}/>
        <Route path='/marketplace' element={<Marketplace/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
