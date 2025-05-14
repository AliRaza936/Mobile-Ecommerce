import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authServicc from './authServices.js'


export let register  = createAsyncThunk("auth/register",async (inputs,thunkAPI)=>{
  try {
    let response =  await  authServicc.registerUser(inputs)
    
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let verify  = createAsyncThunk("auth/verify",async (inputs,thunkAPI)=>{
  try {
    let response =  await  authServicc.verifyuser(inputs)
    
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let login  = createAsyncThunk("auth/login",async (inputs,thunkAPI)=>{
  try {
    let response =  await  authServicc.loginUser(inputs)

    let userData = response?.user;
    const token = response.token;
    
const expiration = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days

    // ✅ Store only necessary user details
    let user = {
      userId: userData?._id

    };

    // ✅ Store user in localStorage (convert to JSON)
    
localStorage.setItem("authToken", JSON.stringify({ token, expiresAt: expiration }));
    localStorage.setItem('user', JSON.stringify(user));
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let withGoogle  = createAsyncThunk("auth/withGoogle",async (inputs,thunkAPI)=>{
  try {
    let response =  await  authServicc.authWithGoogle(inputs)

    let userData = response?.user;
    const token = response.token;
    
const expiration = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days

    // ✅ Store only necessary user details
    let user = {
      userId: userData?._id

    };

    // ✅ Store user in localStorage (convert to JSON)
    
localStorage.setItem("authToken", JSON.stringify({ token, expiresAt: expiration }));
    localStorage.setItem('user', JSON.stringify(user));
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let forgot  = createAsyncThunk("auth/forgot",async (inputs,thunkAPI)=>{
  try {
    let response =  await  authServicc.forgetPassowrd(inputs)

   


    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let reset  = createAsyncThunk("auth/reset",async (inputs,thunkAPI)=>{
  try {
    let response =  await  authServicc.resetPassword(inputs)

   


    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export let logout  = createAsyncThunk("auth/logout",async (thunkAPI)=>{
  try {
    let response =  await  authServicc.logoutUser()

    window.localStorage.removeItem("user")
    window.localStorage.removeItem("authToken")
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

let getUserDataFromLocalStorage = window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")):null
const initialState = {
  user:getUserDataFromLocalStorage,
  status : "idel",
  error : null
}

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  
  extraReducers:(builder)=>{
    builder
    .addCase(register.pending,(state)=>{
      state.status = "loading"
      state.error = null
    }).addCase(register.fulfilled,(state,action)=>{
      state.status = "success"
      state.user = action.payload
    }).addCase(register.rejected,(state,action)=>{
      state.status = "failed"
      state.error = action.payload
      
    })
    .addCase(verify.pending,(state)=>{
      state.status = "loading"
      state.error = null
    }).addCase(verify.fulfilled,(state,action)=>{
      state.status = "success"
      state.user = action.payload
    }).addCase(verify.rejected,(state,action)=>{
      state.status = "failed"
      state.error = action.payload
      
    })
    .addCase(forgot.pending,(state)=>{
      state.status = "loading"
      state.error = null
    }).addCase(forgot.fulfilled,(state,action)=>{
      state.status = "success"
      state.user = action.payload
    }).addCase(forgot.rejected,(state,action)=>{
      state.status = "failed"
      state.error = action.payload
      
    })
    .addCase(reset.pending,(state)=>{
      state.status = "loading"
      state.error = null
    }).addCase(reset.fulfilled,(state,action)=>{
      state.status = "success"
      state.user = action.payload
    }).addCase(reset.rejected,(state,action)=>{
      state.status = "failed"
      state.error = action.payload
      
    })
    .addCase(login.pending,(state)=>{
      state.status = "loading"
      state.error = null

    }).addCase(login.fulfilled,(state,action)=>{
      state.status = "success"
      state.user = action.payload
    }).addCase(login.rejected,(state,action)=>{
      state.status = "failed"
      state.error = action.payload
    })
    .addCase(withGoogle.pending,(state)=>{
      state.status = "loading"
      state.error = null

    }).addCase(withGoogle.fulfilled,(state,action)=>{
      state.status = "success"
      state.user = action.payload
    }).addCase(withGoogle.rejected,(state,action)=>{
      state.status = "failed"
      state.error = action.payload
    })
    .addCase(logout.pending,(state)=>{
      state.status = "loading"
      state.error = null

    }).addCase(logout.fulfilled,(state)=>{
      state.status = "success"
      state.user = null
    }).addCase(logout.rejected,(state,action)=>{
      state.status = "failed"
      state.error = action.payload
    })
 
  }})


// Action creators are generated for each case reducer function
export const { incrementByAmount } = counterSlice.actions

export default counterSlice.reducer




