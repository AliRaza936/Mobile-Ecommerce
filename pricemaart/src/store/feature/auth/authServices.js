import axios from "axios";
import BASE_URL from "../../../../apiConfig";


// For registerPage

let registerUser = async (inputs) => {

try {
  let axiosResponce = await axios
  .post(`${BASE_URL}/user/signup`, inputs, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
  return axiosResponce.data
} catch (error) {
  let errorMessage  = error?.response?.data?.message ||error.message || "Something went wrong. Please try again!"
  return Promise.reject(errorMessage)
}  
};
let verifyuser = async (inputs) => {

try {
  let axiosResponce = await axios
  .post(`${BASE_URL}/user/verifyotp`, inputs, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
  return axiosResponce.data
} catch (error) {
  let errorMessage  = error?.response?.data?.message ||error.message || "Something went wrong. Please try again!"
  return Promise.reject(errorMessage)
}  
};

// For loginPage

let loginUser = async (inputs) => {

try {
  let axiosResponce = await axios
  .post(`${BASE_URL}/user/signin`, inputs, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
  console.log(axiosResponce)
  return axiosResponce.data
} catch (error) {
  console.log(error)
  let errorMessage  = error?.response?.data?.message ||error.message || "Something went wrong. Please try again!"
  return Promise.reject(errorMessage)
}  
};
let forgetPassowrd = async (inputs) => {

try {
  let axiosResponce = await axios
  .post(`${BASE_URL}/user/forgotpassword`, inputs, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
  return axiosResponce.data
} catch (error) {
  let errorMessage  = error?.response?.data?.message ||error.message || "Something went wrong. Please try again!"
  return Promise.reject(errorMessage)
}  
};
let resetPassword = async (inputs) => {

try {
  let axiosResponce = await axios
  .post(`${BASE_URL}/user/reset`, inputs, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
  return axiosResponce.data
} catch (error) {
  let errorMessage  = error?.response?.data?.message ||error.message || "Something went wrong. Please try again!"
  return Promise.reject(errorMessage)
}  
};

// For logout
let logoutUser = async () => {

try {
  let axiosResponce = await axios
  .get(`${BASE_URL}/user/logout`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
  return axiosResponce.data
} catch (error) {
  let errorMessage  = error?.response?.data?.message ||error.message || "Something went wrong. Please try again!"
  return Promise.reject(errorMessage)
}  
};
let authWithGoogle = async (inputs) => {

try {
  let axiosResponce = await axios
  .post(`${BASE_URL}/user/authWithGoogle`,inputs, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
  return axiosResponce.data
} catch (error) {
  let errorMessage  = error?.response?.data?.message ||error.message || "Something went wrong. Please try again!"
  return Promise.reject(errorMessage)
}  
};


let authService = {resetPassword,loginUser,forgetPassowrd,verifyuser,registerUser,logoutUser,authWithGoogle}

export default authService