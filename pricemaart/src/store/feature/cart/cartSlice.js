import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
let loadStatefromLocalStorage = () => {
  try {
    let cartData = window.localStorage.getItem("cart");
    if (cartData == null) {
      return { items: [] };
    }
    return JSON.parse(cartData);
  } catch (error) {
    console.log("Error while loading cart data", error);
    return { items: [] };
  }
};

// Save cart to localStorage
let saveStateIntoLocalStorage = (state) => {
  try {
    let cartData = JSON.stringify(state);
    window.localStorage.setItem("cart", cartData);
  } catch (error) {
    console.log("Error while saving cart", error);
  }
};

// Initial state
const initialState = loadStatefromLocalStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ Add to cart
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.color === newItem.color
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      saveStateIntoLocalStorage(state);
    },

  // ✅ Completely remove item with same id + color
  removeFromCart: (state, action) => {
    const { id, color } = action.payload;
    state.items = state.items.filter(
      (item) => !(item.id === id && item.color === color)
    );
    saveStateIntoLocalStorage(state);
  },
  
  
  updateCart: (state, action) => {
    const { id, color, quantity } = action.payload;
    const existingItem = state.items.find(
      (item) => item.id === id && item.color === color
    );
    if (existingItem) {
      existingItem.quantity = quantity;
    }
    saveStateIntoLocalStorage(state);
  },

    // 🧹 Clear the entire cart
    clearAllCart: (state) => {
      state.items = [];
      saveStateIntoLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearAllCart } = cartSlice.actions;
export default cartSlice.reducer;
