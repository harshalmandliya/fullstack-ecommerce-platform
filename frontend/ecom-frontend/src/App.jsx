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
        <Route path='/' element={<PrivateRoute publicPage />}>
            <Route path='/login' element={ <LogIn />}/>
        </Route>
      </Routes>
    </Router>
    <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
