import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage if available
const loadWishlistFromStorage = () => {
  const storedWishlist = localStorage.getItem("wishlist");
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlistFromStorage(),
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.find(item => item._id === product._id);
      if (!exists) {
        state.push(product);
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    removeFromWishlist: (state, action) => {
      const newState = state.filter(item => item._id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(newState));
      return newState;
    },
    clearWishlist: () => {
      localStorage.removeItem("wishlist");
      return [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
