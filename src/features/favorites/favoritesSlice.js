import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'mbStoreFavorites';

function loadFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    return [];
  }
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavorites(),
  },
  reducers: {
    toggleFavorite(state, action) {
      const product = action.payload;

      const exists = state.items.some(
        (item) => item.id === product.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.items.push(product);
      }
    },

    removeFavorite(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const {
  toggleFavorite,
  removeFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export function saveFavorites(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
}

export default favoritesSlice.reducer;