import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'mbStoreCart';

function loadCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    increaseQuantity(state, action) {
      const item = state.items.find(
        (product) => product.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (product) => product.id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (product) => product.id !== action.payload
        );
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
}

export default cartSlice.reducer;