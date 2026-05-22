import './App.css'
import './styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import toast, { Toaster } from 'react-hot-toast'

import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Feedback from './pages/Feedback'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Orders from './pages/Orders'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Profile from './pages/Profile'
import Services from './pages/Services'
import SignUp from './pages/SignUp'
import TermsOfService from './pages/TermsOfService'
import Wishlist from './pages/Wishlist'

import Layout from './layouts/Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAds from './pages/admin/Ads'
import AdminBlogs from './pages/admin/Blogs'
import AdminFeedback from './pages/admin/Feedback'
import AdminOrders from './pages/admin/Orders'
import AdminProducts from './pages/admin/Products'
import AdminUsers from './pages/admin/Users'
import AdminVendors from './pages/admin/Vendors'

import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorAds from './pages/vendor/Ads'
import VendorAdsPayment from './pages/vendor/AdsPayment'
import VendorProducts from './pages/vendor/Products'
import VendorProductsPayment from './pages/vendor/ProductsPayment'
import VendorSubscription from './pages/vendor/Subscription'

const notify = () => toast('Here is your toast.')

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="toast-button-wrapper">
          <button onClick={notify}>Make me a toast</button>
          <Toaster />
        </div>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="contact" element={<Contact />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/ads" element={<AdminAds />} />
            <Route path="admin/blogs" element={<AdminBlogs />} />
            <Route path="admin/feedback" element={<AdminFeedback />} />
            <Route path="admin/orders" element={<AdminOrders />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/vendors" element={<AdminVendors />} />
            <Route path="vendor" element={<VendorDashboard />} />
            <Route path="vendor/ads" element={<VendorAds />} />
            <Route path="vendor/ads-payment" element={<VendorAdsPayment />} />
            <Route path="vendor/products" element={<VendorProducts />} />
            <Route path="vendor/products-payment" element={<VendorProductsPayment />} />
            <Route path="vendor/subscription" element={<VendorSubscription />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
