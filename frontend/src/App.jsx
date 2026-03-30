import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Products from './components/products/Products';
import Navbar from './components/shared/Navbar';
import About from './components/About';
import Contact from './components/contact';
import React from 'react';
import Cart from './components/cart/Cart';
import LogIn from './components/auth/LogIn';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/auth/Register';
import Checkout from './components/checkout/Checkout';
import PaymentConfirmation from './components/checkout/PaymentConfirmation';
import AdminLayout from './components/admin/AdminLayout'; 
import Dashboard from './components/admin/dashboard/Dashboard';
import AdminProducts from './components/admin/products/AdminProducts';
import Sellers from './components/admin/sellers/Sellers';
import Category from './components/admin/categories/Category';


function App() {
  
  return (
    <React.Fragment>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={ <Products />}/>
        <Route path='/about' element={ <About />}/>
        <Route path='/contact' element={ <Contact />}/>
        <Route path='/cart' element={ <Cart />}/>
        <Route path='/' element={<PrivateRoute />}>
            <Route path='/checkout' element={ <Checkout />}/>
             <Route path='/order-confirm' element={ <PaymentConfirmation />}/>
          </Route>
        <Route path='/' element={<PrivateRoute publicPage />}>
            <Route path='/login' element={ <LogIn />}/>
            <Route path='/register' element={ <Register />}/>
        </Route>
       <Route element={<PrivateRoute adminOnly />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="" element={<Dashboard />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="sellers" element={<Sellers />} />
    <Route path="categories" element={<Category />} />
  </Route>
</Route>
      </Routes>
    </Router>
    <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
