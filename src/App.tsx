import './App.css'
import './styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

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
import AdminLayout from './layouts/AdminLayout'
import VendorLayout from './layouts/VendorLayout'

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
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="ads" element={<AdminAds />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="feedback" element={<AdminFeedback />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="vendors" element={<AdminVendors />} />
          </Route>

          <Route path="/vendor" element={<VendorLayout />}>
            <Route index element={<VendorDashboard />} />
            <Route path="ads" element={<VendorAds />} />
            <Route path="ads-payment" element={<VendorAdsPayment />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="products-payment" element={<VendorProductsPayment />} />
            <Route path="subscription" element={<VendorSubscription />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
