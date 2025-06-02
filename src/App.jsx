import { useState } from 'react'
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
import Favorite from './pages/user/Favorite'
import RecipeDetail from './pages/RecipeDetail'
import RecipeCategories from './pages/RecipeCategories'
import DetailProduct from './pages/DetailProduct';


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
        <Route path='/favorite' element={<Favorite/>} />
        <Route path='/detail-recipe' element={<RecipeDetail/>} />
        <Route path='/recipe-categories' element={<RecipeCategories/>} />
        <Route path='/detail-product' element={<DetailProduct/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
