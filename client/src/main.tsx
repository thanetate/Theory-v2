import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartPage } from './pages/Cart/CartPage.tsx'
import { AccountPage } from './pages/Account/AccountPage.tsx'
import { CollectionsPage } from './pages/Collections/CollectionsPage.tsx'
import { AboutPage } from './pages/About/AboutPage.tsx'
import { ContactPage } from './pages/Contact/ContactPage.tsx'
import { IndividualProductPage } from './pages/Individual/IndividualProductPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/collections/:productId" element={<IndividualProductPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
