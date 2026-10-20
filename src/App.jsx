import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage.jsx';
import ProductPage from './pages/ProductPage/ProductPage.jsx';
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CartPage from './pages/CartPage/CartPage';
import BrandsPage from './pages/BrandsPage/BrandsPage.jsx';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:category" element={<CatalogPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/brands" element={<BrandsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}
