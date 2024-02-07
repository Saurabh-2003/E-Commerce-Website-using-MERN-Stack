import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Loading from './components/Loading'
import LoginSignup from './views/LoginSignup'
import Products from './views/Products'
import Product from './views/Product'
import Account from './views/Account'
import { useDispatch, useSelector } from 'react-redux'
import UpdateProfile from './views/UpdateProfile'
import UpdatePassword from './views/UpdatePassword'
import ForgotPassword from "./views/ForgotPassword"
import ResetPassword from './views/ResetPassword.jsx'
import Cart from './views/Cart.jsx'
import Shipping from "./views/Shipping.jsx"
import ConfirmOrder from './views/ConfirmOrder.jsx'
import Payment from './views/Payment.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Success from './views/Success.jsx'
import MyOrders from './views/MyOrders.jsx'
import OrderDetails from './views/OrderDetails.jsx'
import AdminDashboard from './components/dasboardComponents/AdminDashboard.jsx'
import AdminProducts from './components/dasboardComponents/AdminProducts.jsx'
import AdminCreateProduct from './components/dasboardComponents/AdminCreateProduct.jsx'
import AdminOrders from './components/dasboardComponents/AdminOrders.jsx'
import AdminUsers from './components/dasboardComponents/AdminUsers.jsx'
import AdminReviews from './components/dasboardComponents/AdminReviews.jsx'
import Dashboard from './views/Dashboard.jsx'

function App() {
  const {isAuthenticated} = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState('')


  const getStripeApiKey = async() => {
    const config = {withCredentials :true}
    const {data} = await axios.get("http://localhost:4000/api/v1/stripeapikey", config)
    setStripeApiKey(data.stripeApiKey)

    console.log(stripeApiKey)
  }

  useEffect(() => {
    getStripeApiKey()
  }, [])


  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          {isAuthenticated  && <Route exact path='/account' element={<Account />} />}
          
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<LoginSignup/>} />
          <Route exact path='/products/' element={<Products/>} />
          <Route exact path='/product/' element={<Product/>} />
          <Route path='/products/:keyword' element={<Products/>} />
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />


          <Route path="/admin/*" element={<Dashboard />} />

          
          {isAuthenticated && <Route exact path='/me/shipping' element={<Shipping />} /> }
          {isAuthenticated && <Route exact path='/order/confirm' element={<ConfirmOrder />} /> }
          {stripeApiKey && (
              <Route exact path="/process/payment" 
              element={
                    <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment/>     
                    </Elements>} />
          )}
          {isAuthenticated && <Route exact path='/success' element={<Success />} />}
          {isAuthenticated && <Route exact path='/curorder/:id' element={<OrderDetails />} />}
          {isAuthenticated && <Route exact path='/me/order' element={<MyOrders />} />}
          {isAuthenticated && <Route exact path='/me/cart' element={<Cart />} />}
          {isAuthenticated && <Route exact path='/me/update' element={<UpdateProfile />} />}
          {isAuthenticated && <Route exact path='/me/password' element={<UpdatePassword />} />}
        </Routes>
      <Footer />
    </BrowserRouter>
  )
};

export default App
