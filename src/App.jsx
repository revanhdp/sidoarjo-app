import { useState } from 'react'
import './App.css'
import LandingPage from './pages/home/LandingPage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Recipe from './pages/recipe/Recipe'
import Marketplace from './pages/products/Marketplace'
import Article from './pages/article/Article'
import Login from './pages/auth/Login'
import DetailArticle from './pages/article/ArticleDetail'
import Register from './pages/auth/Register'
import Profile from './pages/user/Profile'
import Favorite from './pages/user/Favorite'
import RecipeDetail from './pages/recipe/RecipeDetail'
import RecipeCategories from './pages/recipe/RecipeCategories'
import DetailProduct from './pages/products/DetailProduct';
import AddProduct from './pages/admin/AddProduct';
import ProductManager from './pages/admin/ProductManager';
import Checkout from './pages/payment/Checkout';
import Payment from './pages/payment/Payment';
import AddArticle from './pages/admin/AddArticle';
import ArticleManager from './pages/admin/ArticleManager';
import AdminProfile from './pages/admin/AdminProfile';
import AddRecipe from './pages/admin/AddRecipe';
import MyOrder from './pages/user/MyOrder';


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
        <Route path='/my-order' element={<MyOrder/>} />
        <Route path='/detail-recipe' element={<RecipeDetail/>} />
        <Route path='/recipe-categories' element={<RecipeCategories/>} />
        <Route path='/detail-product' element={<DetailProduct/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/admin/add-product' element={<AddProduct/>} />
        <Route path='/admin/add-article' element={<AddArticle/>} />
        <Route path='/admin/add-recipe' element={<AddRecipe/>} />
        <Route path='/admin/product-manager' element={<ProductManager/>} />
        <Route path='/admin/article-manager' element={<ArticleManager/>} />
        <Route path='/admin/profile' element={<AdminProfile/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
