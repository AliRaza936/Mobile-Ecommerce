import { configureStore } from '@reduxjs/toolkit'
import productReducer from './feature/product/productSlice.js'
import cartReducer from './feature/cart/cartSlice.js'
import orderReducer from './feature/order/orderSlice.js'
import authReducer from './feature/auth/authSlice.js'
import wishlistReducer from './feature/whishList/whishList.js'

export const store = configureStore({
  reducer: {
    product:productReducer,
    cart:cartReducer,
    order:orderReducer,
    auth:authReducer,
    wishlist:wishlistReducer,
  },
})