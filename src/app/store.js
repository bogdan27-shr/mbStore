import { configureStore } from '@reduxjs/toolkit';

import { productsApi } from '../services/productsApi.js';
import favoritesReducer from '../features/favorites/favoritesSlice';
import { saveFavorites } from '../features/favorites/favoritesSlice';
import cartReducer, { saveCart } from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});


let previousFavorites = store.getState().favorites.items;

store.subscribe(() => {
  const currentFavorites = store.getState().favorites.items;

  if (currentFavorites !== previousFavorites) {
    previousFavorites = currentFavorites;
    saveFavorites(currentFavorites);
  }
});


let previousCart = store.getState().cart.items;

store.subscribe(() => {
  const currentCart = store.getState().cart.items;

  if (currentCart !== previousCart) {
    previousCart = currentCart;
    saveCart(currentCart);
  }
});