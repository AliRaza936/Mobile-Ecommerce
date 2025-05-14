import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productsService from './productService.js'



export let getAllProducts = createAsyncThunk("products/getAllProducts",async (inputs,thunkAPI)=>{
  try {
    let response =  await  productsService.getAllProd(inputs)  
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let getCatProduct = createAsyncThunk("products/getCatProduct",async (catName,thunkAPI)=>{
  try {
    let response =  await  productsService.getProductWithCatName(catName)  
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export let getAllAccProducts = createAsyncThunk("products/getAllAccProducts",async (inputs,thunkAPI)=>{
  try {
    let response =  await  productsService.getAllAccProd(inputs)  
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let getAccCatProduct = createAsyncThunk("products/getAccCatProduct",async (catName,thunkAPI)=>{
  try {
    let response =  await  productsService.getAccProductWithCatName(catName)  
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export let getSingleProd = createAsyncThunk("products/getSingleProd",async (id,thunkAPI)=>{
  try {
    let response =  await  productsService.getSingleProduct(id)  
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let getAccSingleProd = createAsyncThunk("products/getAccSingleProd",async (id,thunkAPI)=>{
  try {
    let response =  await  productsService.getSingleAccPorduct(id)  
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let featuredProduct = createAsyncThunk("products/featuredProduct",async (input,thunkAPI)=>{
  try {
    let response =  await  productsService.getFeaturedProducts(input)  
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let offerProducts = createAsyncThunk("products/offerProduct",async (input,thunkAPI)=>{
  try {
    let response =  await  productsService.getOfferProduct(input)  
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})




const initialState = {
  products:[],
  status : "idel",
  loading:false,
  featuredProducts: [],
  offerProduct:[],
  accProduct:[],
  error : null
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.accProduct = [];
      state.featuredProducts = [];
      state.offerProduct = [];
      state.status = "idel";
      state.loading = false;
      state.error = null;
    },
    
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  
  extraReducers: (builder) => {
    builder
  
      // 📦 All Products
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
  
      // 📂 Products by Category
      .addCase(getCatProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getCatProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getCatProduct.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
  
      // 🔍 Single Product
      .addCase(getSingleProd.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProd.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getSingleProd.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
  
      // 🌟 Featured Products
      .addCase(featuredProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(featuredProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(featuredProduct.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
  
      // 🎁 Offer Products
      .addCase(offerProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(offerProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.offerProduct = action.payload;
      })
      .addCase(offerProducts.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllAccProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAccProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.accProduct = action.payload;
      })
      .addCase(getAllAccProducts.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAccCatProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccCatProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.accProduct = action.payload;
      })
      .addCase(getAccCatProduct.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAccSingleProd.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccSingleProd.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.accProduct = action.payload;
      })
      .addCase(getAccSingleProd.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
  }
})


// Action creators are generated for each case reducer function

export const { resetProducts, incrementByAmount } = productsSlice.actions;

export default productsSlice.reducer




