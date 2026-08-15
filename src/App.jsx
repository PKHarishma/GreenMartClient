import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './components/Login'

import Home from './pages/Home'
import AllProduct from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrder from './pages/MyOrders'

import SellerLogin from './components/seller/SellerLogin'
import SellerLayOut from './pages/seller/SellerLayOut'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'

import { Toaster } from 'react-hot-toast'
import { UseAppContext } from './context/AppContext'

const App = () => {
  const location = useLocation()

  const isSellerPath = location.pathname.includes('/seller')

  const {
    showUserLogin,
    isSeller
  } = UseAppContext()

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">

      {/* Navbar */}
      {!isSellerPath && <NavBar />}

      {/* Login Popup */}
      {showUserLogin && <Login />}

      {/* Toast Messages */}
      <Toaster />

      <div
        className={
          isSellerPath
            ? ''
            : 'px-6 md:px-16 lg:px-24 xl:px-32'
        }
      >

        <Routes>

          {/* USER ROUTES */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<AllProduct />}
          />

          <Route
            path="/products/:category"
            element={<ProductCategory />}
          />

          <Route
            path="/products/:category/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/add-address"
            element={<AddAddress />}
          />

          <Route
            path="/my-orders"
            element={<MyOrder />}
          />


          {/* SELLER ROUTES */}

          <Route
            path="/seller"
            element={
              isSeller
                ? <SellerLayOut />
                : <SellerLogin />
            }
          >

            <Route
              index
              element={
                isSeller
                  ? <AddProduct />
                  : null
              }
            />

            <Route
              path="product-list"
              element={<ProductList />}
            />

            <Route
              path="orders"
              element={<Orders />}
            />

          </Route>

        </Routes>

      </div>

      {/* Footer */}
      {!isSellerPath && <Footer />}

    </div>
  )
}

export default App