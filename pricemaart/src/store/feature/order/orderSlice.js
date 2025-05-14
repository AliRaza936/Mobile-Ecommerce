import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderService from './/orderService.js'


export let addOrder = createAsyncThunk("orders/addOrder",async ({inputs,userId},thunkAPI)=>{
  try {
    let response =  await  orderService.createOrder({inputs,userId})  
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
// export let getAllProducts = createAsyncThunk("products/getAllProducts",async (inputs,thunkAPI)=>{
//   try {
//     let response =  await  orderService.getAllProd(inputs)  
//     return response
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error)
//   }
// })
// export let deleteProd = createAsyncThunk("products/deleteProd",async (productId,thunkAPI)=>{
//   try {
//     let response =  await  orderService.deleteProduct(productId)  
//     return response
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error)
//   }
// })
// export let getSingleProd = createAsyncThunk("products/getSingleProd",async (productId,thunkAPI)=>{
//   try {
//     let response =  await  orderService.getSingleProduct(productId)  
//     return response
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error)
//   }
// })
// export let updateProd = createAsyncThunk("products/updateProd",async ({productId,inputs},thunkAPI)=>{
//   try {
//     let response =  await  orderService.updateProduct({productId,inputs})  
//     return response
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error)
//   }
// })



const initialState = {
  products:[],
  status : "idel",
  error : null
}

export const productsSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  
  extraReducers:(builder)=>{
    builder
    .addCase(addOrder.pending,(state)=>{
      state.status = "loading"
      state.error = null
    }).addCase(addOrder.fulfilled,(state,action)=>{
      state.status = "success"
      state.products = action.payload
    }).addCase(addOrder.rejected,(state,action)=>{
      state.status = "failed"
      state.error = action.payload
      
    })
    // .addCase(getAllProducts.pending,(state)=>{
    //   state.status = "loading"
    //   state.error = null
    // }).addCase(getAllProducts.fulfilled,(state,action)=>{
    //   state.status = "success"
    //   state.products = action.payload
    // }).addCase(getAllProducts.rejected,(state,action)=>{
    //   state.status = "failed"
    //   state.error = action.payload
      
    // })
    // .addCase(deleteProd.pending,(state)=>{
    //   state.status = "loading"
    //   state.error = null
    // }).addCase(deleteProd.fulfilled,(state,action)=>{
    //   state.status = "success"
    //   state.products = action.payload
    // }).addCase(deleteProd.rejected,(state,action)=>{
    //   state.status = "failed"
    //   state.error = action.payload
      
    // })
    // .addCase(getSingleProd.pending,(state)=>{
    //   state.status = "loading"
    //   state.error = null
    // }).addCase(getSingleProd.fulfilled,(state,action)=>{
    //   state.status = "success"
    //   state.products = action.payload
    // }).addCase(getSingleProd.rejected,(state,action)=>{
    //   state.status = "failed"
    //   state.error = action.payload
      
    // })
    // .addCase(updateProd.pending,(state)=>{
    //   state.status = "loading"
    //   state.error = null
    // }).addCase(updateProd.fulfilled,(state,action)=>{
    //   state.status = "success"
    //   state.products = action.payload
    // }).addCase(updateProd.rejected,(state,action)=>{
    //   state.status = "failed"
    //   state.error = action.payload
      
    // })
   
  }})


// Action creators are generated for each case reducer function


export default productsSlice.reducer




